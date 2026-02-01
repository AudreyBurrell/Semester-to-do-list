import './ManageAssignments.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function ManageAssignments() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    assignments: initialAssignments,
    classes,
    completedAssignments,
    updateAssignments
  } = location.state || {
    assignments: {},
    classes: [],
    completedAssignments: {}
  };

  const [assignments, setAssignments] = useState(initialAssignments);

  const userId = localStorage.getItem('userId');

  const saveToBackend = async (updatedAssignments) => {
    try {
      const response = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          assignments: updatedAssignments
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save');
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const getClassesFromAssignments = (assignmentsData) => {
    const classesMap = new Map();

    Object.values(assignmentsData).forEach(assignmentsForDate => {
      assignmentsForDate.forEach(assignment => {
        if (assignment.className && assignment.color) {
          classesMap.set(assignment.className, {
            name: assignment.className,
            color: assignment.color
          });
        }
      });
    });

    return Array.from(classesMap.values());
  };

  const classNames = getClassesFromAssignments(assignments);
  const [selectedClass, setSelectedClass] = useState('');

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const getAssignmentsForClass = (className) => {
    const assignmentsMap = new Map();

    Object.entries(assignments).forEach(([date, assignmentsForDate]) => {
      assignmentsForDate.forEach((assignment, index) => {
        if (assignment.className === className) {
          if (!assignmentsMap.has(assignment.id)) {
            const dates = [];

            Object.entries(assignments).forEach(([d, assigns]) => {
              if (assigns.some(a => a.id === assignment.id)) {
                dates.push(d);
              }
            });

            assignmentsMap.set(assignment.id, {
              ...assignment,
              dates: dates.sort(),
              startDate: dates[0],
              endDate: dates[dates.length - 1],
              originalIndex: index
            });
          }
        }
      });
    });

    return Array.from(assignmentsMap.values());
  };

  const filteredAssignments = selectedClass
    ? getAssignmentsForClass(selectedClass)
    : [];

  const selectedClassColor =
    classNames.find(c => c.name === selectedClass)?.color || '#ccc';

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setEditForm({
      name: assignment.name,
      startDate: assignment.startDate || assignment.dates[0],
      endDate: assignment.endDate || assignment.dates[assignment.dates.length - 1]
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingAssignment(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const assignmentId = editingAssignment.id;
    const updatedAssignments = JSON.parse(JSON.stringify(assignments));

    Object.keys(updatedAssignments).forEach(date => {
      updatedAssignments[date] = updatedAssignments[date].filter(
        a => a.id !== assignmentId
      );
      if (updatedAssignments[date].length === 0) {
        delete updatedAssignments[date];
      }
    });

    const start = new Date(editForm.startDate);
    const end = new Date(editForm.endDate);

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateKey = date.toISOString().split('T')[0];

      if (!updatedAssignments[dateKey]) {
        updatedAssignments[dateKey] = [];
      }

      updatedAssignments[dateKey].push({
        ...editingAssignment,
        name: editForm.name,
        date: dateKey
      });
    }

    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
    await saveToBackend(updatedAssignments);

    if (updateAssignments) {
      updateAssignments(updatedAssignments);
    }

    handleCloseModal();
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  const handleConfirmDelete = async () => {
    const assignmentId = deletingAssignment.id;
    const updatedAssignments = JSON.parse(JSON.stringify(assignments));

    Object.keys(updatedAssignments).forEach(date => {
      updatedAssignments[date] = updatedAssignments[date].filter(
        a => a.id !== assignmentId
      );
      if (updatedAssignments[date].length === 0) {
        delete updatedAssignments[date];
      }
    });

    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
    await saveToBackend(updatedAssignments);

    if (updateAssignments) {
      updateAssignments(updatedAssignments);
    }

    setIsDeleteModalOpen(false);
    setDeletingAssignment(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingAssignment(null);
  };

  return (
    <div>
      <div className="header">
        <button id="backBtn" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h3>Manage Assignments</h3>
      </div>

      <div className="backgroundCard">
        {classNames.length === 0 ? (
          <p>No Data</p>
        ) : (
          <div className="manageAssignmentArea">
            <label className="classSelectLabel">Select Class:</label>

            <select
              className="classDropdown"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="">Choose a class...</option>
              {classNames.map(c => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {selectedClass && (
              <div className="assignmentsSection">
                <h4>Assignments for {selectedClass}</h4>

                <div className="assignmentCards">
                  {filteredAssignments.map(assignment => (
                    <div
                      key={assignment.id}
                      className="assignmentCard"
                      style={{ borderLeftColor: selectedClassColor }}
                    >
                      <div className="assignmentInfo">
                        <span className="assignmentName">
                          {assignment.name}
                        </span>
                        <span className="assignmentDate">
                          {assignment.dates[0]} –{' '}
                          {assignment.dates[assignment.dates.length - 1]}
                        </span>
                      </div>

                      <div className="assignmentActions">
                        <button
                          className="editBtn"
                          onClick={() => handleEdit(assignment)}
                        >
                          Edit
                        </button>
                        <button
                          className="deleteBtn"
                          onClick={() => {
                            setDeletingAssignment(assignment);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="modalOverlay" onClick={handleCloseModal}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <h3>Edit Assignment</h3>

            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleFormChange}
            />
            <input
              type="date"
              name="startDate"
              value={editForm.startDate}
              onChange={handleFormChange}
            />
            <input
              type="date"
              name="endDate"
              value={editForm.endDate}
              onChange={handleFormChange}
            />

            <div className="modalActions">
              <button className="cancelBtn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="saveBtn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="modalOverlay" onClick={handleCancelDelete}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <h3>Delete Assignment?</h3>
            <p>
              Are you sure you want to delete{' '}
              <strong>{deletingAssignment?.name}</strong>?
            </p>
            <p className="warningText">
              This removes it from all dates.
            </p>

            <div className="modalActions">
              <button className="cancelBtn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button
                className="deleteConfirmBtn"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAssignments;
