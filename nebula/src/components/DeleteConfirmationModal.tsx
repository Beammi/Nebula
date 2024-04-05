// DeleteConfirmationModal.tsx
import React from "react"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white drop-shadow-xl p-4 rounded-lg border-solid border-2">
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete "{itemName}"?</p>
        <div className="space-x-4">
          <button onClick={onConfirm} className="btn btn-danger ">
            Delete
          </button>
          <button onClick={onClose} className="btn bg-red ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
