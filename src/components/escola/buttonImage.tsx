import React from "react"
import { ImagePlus } from "lucide-react"

interface UploadImagemProps {
  label: string
  onChange?: (file: File) => void
}

function UploadImagem({ label, onChange }: UploadImagemProps) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      onChange?.(e.target.files[0])
    }
  }

  return (
    <div className="uploadGroup">
      <label className="uploadLabel">{label}</label>

      <label className="uploadBox">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="uploadInput"
        />

        <span className="uploadIcon">
          <ImagePlus size={22} />
        </span>
      </label>
    </div>
  )
}

export default UploadImagem