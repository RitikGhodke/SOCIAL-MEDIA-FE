// import React, { useContext, useRef, useState } from 'react'
// import { uiContext } from '../App'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import "../otp.css"
// import { useNavigate } from 'react-router-dom'

// const Signup = () => {
//   const{ui, setUi} = useContext(uiContext)
//   return (
//     <div>
//       {ui == 0 ? <Email /> : (ui == 1 ? <VerifyOtp /> : <SignupForm />)}
//     </div>
//   )
// }

// export default Signup

// const Email = () => {
//   const{ui, setUi, email, setEmail} = useContext(uiContext)
//   const navigate = useNavigate()

//   function btnCLickhandler()
//   {
//     async function sendOtp()
//     {
//       try {
//         const res = await axios.post(import.meta.env.VITE_DOMAIN + "/api/otp/send-otp", {email})
//         // console.log(res)
//         setUi(1)
//       } catch (error) {
//         toast.error(error.response.data.error)
//       }
//     }
//     sendOtp()
//   }
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
//         <label
//           htmlFor="email"
//           className="block text-gray-700 font-medium mb-2 text-center"
//         >
//           Please Enter your email for OTP verification
//         </label>
//         <input
//           onChange={(e) => {
//             setEmail(e.target.value)
//           }}
//           id="email"
//           type="text"
//           placeholder="Enter your email"
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//         />
//         <button
//           onClick={btnCLickhandler}
//           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-blue-600 transition"
//         >
//           Send
//         </button>

//         <p className='text-right mt-2'>Already a user? <span onClick={() => {
//           navigate("/login")
//         }} className='text-blue-400 cursor-pointer'>Sign in</span> instead</p>
//       </div>
//     </div>
//   )
// }

// const VerifyOtp = () => {
//   const inputRef = useRef([]);
//     const{email, setUi} = useContext(uiContext)

//   const [otp, setOtp] = useState(Array(6).fill("")); // store OTP digits

//   const focusInput = (index) => {
//     if (inputRef.current[index]) {
//       inputRef.current[index].focus();
//     }
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;

//     if (!/^\d$/.test(value)) {
//       e.target.value = "";
//       return;
//     }

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (index < 5 && value) {
//       focusInput(index + 1);
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const newOtp = [...otp];
//       if (otp[index]) {
//         // clear current value
//         newOtp[index] = "";
//         setOtp(newOtp);
//       } else if (index > 0) {
//         // move focus back if current is empty
//         focusInput(index - 1);
//       }
//     }
//   };

//   const handleVerify = () => {
//     const enteredOtp = otp.join("");

//     async function verify() {
//       try {
//         const res = await axios.post(import.meta.env.VITE_DOMAIN + "/api/otp/verify-otp", {otp : enteredOtp, email})
//         // console.log(res)
//         setUi(2)
//       } catch (error) {
//         toast.error(error.response.data.error)
//       }
//     }
//     verify()
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
//       <div className="flex space-x-3">
//         {[...Array(6)].map((_, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputRef.current[index] = el)}
//             type="text"
//             inputMode="numeric"
//             maxLength={1}
//             value={otp[index]}
//             onChange={(e) => handleChange(e, index)}
//             onKeyDown={(e) => handleKeyDown(e, index)}
//             className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         ))}
//       </div>

//       <button
//         onClick={handleVerify}
//         className="px-6 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
//       >
//         Verify OTP
//       </button>
//     </div>
//   );
// };





// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mail: "",
//     password: "",
//     username: "",
//     dateOfBirth: "",
//     gender: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // 🔥 Replace with your backend endpoint
//       const res = await axios.post(import.meta.env.VITE_DOMAIN +"/api/auth/signup",
//         formData
//       );
//       console.log(res.data);
//       toast.success("Signup successful 🎉");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Signup failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-2xl p-6 w-[28rem] space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>

//         {/* First & Last Name */}
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//             className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//             className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Email */}
//         <input
//           type="email"
//           name="mail"
//           placeholder="Email"
//           value={formData.mail}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Username */}
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Password */}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* DOB */}
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={formData.dateOfBirth}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Gender */}
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-blue-600 transition"
//         >
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// };









import React, { useContext, useRef, useState } from 'react'
import { uiContext } from '../App'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// ── Shared bg wrapper ─────────────────────────────────────────
const PageShell = ({ children }) => (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #e0e7ff 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif", padding: "20px", position: "relative", overflow: "hidden"
  }}>
    <div style={{ position: "fixed", top: "-80px", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ position: "fixed", bottom: "-80px", right: "-80px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
    {children}
  </div>
)

const Card = ({ children, wide }) => (
  <div style={{
    background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)",
    borderRadius: "24px", boxShadow: "0 8px 40px rgba(168,85,247,0.13), 0 2px 8px rgba(0,0,0,0.06)",
    padding: "36px 32px", width: "100%", maxWidth: wide ? "480px" : "420px",
    border: "1px solid rgba(168,85,247,0.12)", position: "relative", zIndex: 1
  }}>
    {children}
  </div>
)

const Brand = () => (
  <div style={{ textAlign: "center", marginBottom: "24px" }}>
    <div style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: "52px", height: "52px", borderRadius: "16px",
      background: "linear-gradient(135deg, #a855f7, #ec4899)",
      marginBottom: "10px", boxShadow: "0 4px 16px rgba(168,85,247,0.35)"
    }}>
      <span style={{ fontSize: "24px" }}>💬</span>
    </div>
    <h1 style={{
      margin: 0, fontSize: "22px", fontWeight: "700",
      background: "linear-gradient(135deg, #a855f7, #ec4899)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
    }}>Dosti</h1>
  </div>
)

const Steps = ({ current }) => {
  const steps = ["Email", "Verify OTP", "Create Account"]
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: i <= current ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(168,85,247,0.12)",
              color: i <= current ? "#fff" : "#a855f7",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: "700",
              boxShadow: i === current ? "0 2px 10px rgba(168,85,247,0.4)" : "none",
            }}>
              {i < current ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: "10px", color: i <= current ? "#7c3aed" : "#a0aec0", fontWeight: i === current ? "600" : "400", whiteSpace: "nowrap" }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ height: "2px", width: "40px", marginBottom: "14px", background: i < current ? "linear-gradient(90deg, #a855f7, #ec4899)" : "rgba(168,85,247,0.15)" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const inputBase = {
  width: "100%", boxSizing: "border-box", padding: "10px 14px",
  border: "1.5px solid rgba(168,85,247,0.25)", borderRadius: "12px",
  fontSize: "14px", background: "rgba(248,245,255,0.7)",
  outline: "none", color: "#1e1b4b"
}

const labelBase = { display: "block", fontSize: "12px", fontWeight: "600", color: "#7c3aed", marginBottom: "5px" }

const focusOn  = e => { e.target.style.borderColor = "#a855f7"; e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.12)" }
const focusOff = e => { e.target.style.borderColor = "rgba(168,85,247,0.25)"; e.target.style.boxShadow = "none" }

const GradientBtn = ({ children, onClick, type = "button", disabled }) => (
  <button type={type} onClick={onClick} disabled={disabled} style={{
    width: "100%", padding: "12px",
    background: disabled ? "#e5e7eb" : "linear-gradient(135deg, #a855f7, #ec4899)",
    color: "#fff", border: "none", borderRadius: "12px",
    fontSize: "15px", fontWeight: "700", cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: disabled ? "none" : "0 4px 16px rgba(168,85,247,0.35)", letterSpacing: "0.3px"
  }}
    onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = "0.9" }}
    onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
  >
    {children}
  </button>
)

// ════════════════════════════════════════════════════════════════
const Signup = () => {
  const { ui } = useContext(uiContext)
  return ui === 0 ? <Email /> : ui === 1 ? <VerifyOtp /> : <SignupForm />
}
export default Signup

// ── Step 1: Email ─────────────────────────────────────────────
const Email = () => {
  const { setUi, email, setEmail } = useContext(uiContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function sendOtp() {
    if (!email) return toast.error("Please enter your email")
    setLoading(true)
    try {
      await axios.post(import.meta.env.VITE_DOMAIN + "/api/otp/send-otp", { email })
      toast.success("OTP sent! Check your email 📧")
      setUi(1)
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <Card>
        <Brand />
        <Steps current={0} />
        <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "700", color: "#1e1b4b", textAlign: "center" }}>Verify your email</h2>
        <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#94a3b8", textAlign: "center" }}>We'll send a 6-digit OTP to your email</p>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelBase}>Email Address</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "15px" }}>✉️</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendOtp()}
              autoComplete="off"
              style={{ ...inputBase, paddingLeft: "36px" }}
              onFocus={focusOn} onBlur={focusOff}
            />
          </div>
        </div>

        <GradientBtn onClick={sendOtp} disabled={loading || !email}>
          {loading ? "Sending OTP..." : "Send OTP →"}
        </GradientBtn>

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#94a3b8" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#a855f7", fontWeight: "600", cursor: "pointer" }}>Sign in</span>
        </p>
      </Card>
    </PageShell>
  )
}

// ── Step 2: Verify OTP ────────────────────────────────────────
const VerifyOtp = () => {
  const inputRef = useRef([])
  const { email, setUi } = useContext(uiContext)
  const [otp, setOtp] = useState(Array(6).fill(""))
  const [loading, setLoading] = useState(false)

  const focusInput = i => inputRef.current[i]?.focus()

  const handleChange = (e, index) => {
    const value = e.target.value
    if (!/^\d$/.test(value)) { e.target.value = ""; return }
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp)
    if (index < 5) focusInput(index + 1)
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp]
      if (otp[index]) { newOtp[index] = ""; setOtp(newOtp) }
      else if (index > 0) focusInput(index - 1)
    }
  }

  const handlePaste = e => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = Array(6).fill("")
    pasted.split("").forEach((ch, i) => { newOtp[i] = ch })
    setOtp(newOtp)
    focusInput(Math.min(pasted.length, 5))
  }

  async function verify() {
    setLoading(true)
    try {
      await axios.post(import.meta.env.VITE_DOMAIN + "/api/otp/verify-otp", { otp: otp.join(""), email })
      toast.success("Email verified! 🎉")
      setUi(2)
    } catch (error) {
      toast.error(error.response?.data?.error || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const filled = otp.every(d => d !== "")

  return (
    <PageShell>
      <Card>
        <Brand />
        <Steps current={1} />
        <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "700", color: "#1e1b4b", textAlign: "center" }}>Enter OTP</h2>
        <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#94a3b8", textAlign: "center" }}>
          Sent to <span style={{ color: "#a855f7", fontWeight: "600" }}>{email}</span>
        </p>
        <p style={{ margin: "0 0 24px", fontSize: "12px", color: "#f59e0b", textAlign: "center" }}>⏱ Valid for 2 minutes</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "24px" }} onPaste={handlePaste}>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              ref={el => (inputRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[i]}
              onChange={e => handleChange(e, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              autoComplete="off"
              style={{
                width: "44px", height: "52px", textAlign: "center",
                fontSize: "20px", fontWeight: "700",
                border: otp[i] ? "2px solid #a855f7" : "2px solid rgba(168,85,247,0.2)",
                borderRadius: "12px",
                background: otp[i] ? "rgba(168,85,247,0.08)" : "rgba(248,245,255,0.7)",
                color: "#1e1b4b", outline: "none",
                boxShadow: otp[i] ? "0 0 0 3px rgba(168,85,247,0.12)" : "none",
                transition: "all 0.15s"
              }}
            />
          ))}
        </div>

        <GradientBtn onClick={verify} disabled={!filled || loading}>
          {loading ? "Verifying..." : "Verify OTP ✓"}
        </GradientBtn>

        <p style={{ textAlign: "center", marginTop: "14px", fontSize: "13px", color: "#94a3b8" }}>
          Wrong email?{" "}
          <span onClick={() => setUi(0)} style={{ color: "#a855f7", fontWeight: "600", cursor: "pointer" }}>Go back</span>
        </p>
      </Card>
    </PageShell>
  )
}

// ── Step 3: Signup Form ───────────────────────────────────────
const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", mail: "",
    password: "", username: "", dateOfBirth: "", gender: ""
  })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(import.meta.env.VITE_DOMAIN + "/api/auth/signup", formData)
      toast.success("Account created! Welcome 🎉")
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <Card wide>
        <Brand />
        <Steps current={2} />
        <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "700", color: "#1e1b4b", textAlign: "center" }}>Create your account</h2>
        <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#94a3b8", textAlign: "center" }}>Almost there! Fill in your details</p>

        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Name row */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelBase}>First Name</label>
              <input name="firstName" placeholder="Ritik" value={formData.firstName}
                onChange={handleChange} required autoComplete="off"
                style={inputBase} onFocus={focusOn} onBlur={focusOff} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelBase}>Last Name</label>
              <input name="lastName" placeholder="Ghodke" value={formData.lastName}
                onChange={handleChange} required autoComplete="off"
                style={inputBase} onFocus={focusOn} onBlur={focusOff} />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "14px" }}>
            <label style={labelBase}>Email</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>✉️</span>
              <input type="email" name="mail" placeholder="you@example.com"
                value={formData.mail} onChange={handleChange} required autoComplete="off"
                style={{ ...inputBase, paddingLeft: "36px" }} onFocus={focusOn} onBlur={focusOff} />
            </div>
          </div>

          {/* Username */}
          <div style={{ marginBottom: "14px" }}>
            <label style={labelBase}>Username</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", fontWeight: "700", color: "#a855f7" }}>@</span>
              <input type="text" name="username" placeholder="ritik_07"
                value={formData.username} onChange={handleChange} required autoComplete="off"
                style={{ ...inputBase, paddingLeft: "32px" }} onFocus={focusOn} onBlur={focusOff} />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "14px" }}>
            <label style={labelBase}>Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>🔒</span>
              <input
                type={showPass ? "text" : "password"}
                name="password" placeholder="Min 8 characters"
                value={formData.password} onChange={handleChange} required
                autoComplete="new-password"
                style={{ ...inputBase, paddingLeft: "36px", paddingRight: "40px" }}
                onFocus={focusOn} onBlur={focusOff}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: "0"
              }}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* DOB */}
          <div style={{ marginBottom: "14px" }}>
            <label style={labelBase}>Date of Birth</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>🎂</span>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth}
                onChange={handleChange} required
                style={{ ...inputBase, paddingLeft: "36px" }} onFocus={focusOn} onBlur={focusOff} />
            </div>
          </div>

          {/* Gender */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelBase}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required
              style={{ ...inputBase, cursor: "pointer" }} onFocus={focusOn} onBlur={focusOff}>
              <option value="">Select Gender</option>
              <option value="male">👦 Male</option>
              <option value="female">👧 Female</option>
              <option value="other">🧑 Other</option>
            </select>
          </div>

          <GradientBtn type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account 🚀"}
          </GradientBtn>
        </form>

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#94a3b8" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#a855f7", fontWeight: "600", cursor: "pointer" }}>Sign in</span>
        </p>
      </Card>
    </PageShell>
  )
}