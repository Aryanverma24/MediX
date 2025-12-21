import { useState } from "react"
import { sendCsvEmails } from "../../services/emailApi"
import { useAuth } from "../../hooks/useAuth"
import { UploadCloud, Send } from "lucide-react"

const SendEmailBulks = () => {
  const { token } = useAuth()

  const [csv, setCsv] = useState(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!csv || !subject || !message) {
      return setStatus("⚠️ Please fill all fields")
    }

    const formData = new FormData()
    formData.append("csv", csv)
    formData.append("subject", subject)
    formData.append("message", message)

    try {
      setLoading(true)
      setStatus("")
      const res = await sendCsvEmails(formData)
      setStatus(`✅ Emails sent to ${res.data.totalEmails} users`)
      setCsv(null)
      setSubject("")
      setMessage("")
    } catch (err) {
      setStatus("❌ Failed to send emails")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            📩 Bulk Email Broadcast
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload CSV & send calm announcements
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* CSV Upload */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-emerald-300 rounded-xl p-4 cursor-pointer hover:bg-emerald-50 transition">
            <UploadCloud className="text-emerald-500" />
            <span className="text-sm text-gray-600">
              {csv ? csv.name : "Upload CSV file (email column)"}
            </span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => setCsv(e.target.files[0])}
            />
          </label>

          {/* Subject */}
          <input
            type="text"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          {/* Message */}
          <textarea
            rows={5}
            placeholder="Write a calm meditation message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
          />

          {/* Button */}
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send Emails"}
          </button>
        </form>

        {/* Status */}
        {status && (
          <p className="text-center text-sm mt-4 text-gray-700">
            {status}
          </p>
        )}
      </div>
    </div>
  )
}

export default SendEmailBulks
