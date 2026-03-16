import{Y as O,M as $,v as n,j as e,P as g,x as u,L as b,w as z,X as M,S as C,T as F,U as R,c as Z}from"./index-D1NeXGK5.js";import{A as B}from"./config-4bejqdIK.js";const w=`
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap");

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #E63E4E;
    --primary-dark: #B31E2C;
    --secondary: #c0392b;
    --success: #48bb78;
    --warning: #ecc94b;
    --error: #f56565;
    --text-primary: #2d3748;
    --text-secondary: #718096;
    --text-muted: #a0aec0;
    --bg-light: #f5f7fa;
    --bg-white: #ffffff;
    --border-light: #e2e8f0;
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --radius: 12px;
    --transition: 0.22s cubic-bezier(.4,0,.2,1);
  }

  .rp-root {
    min-height: 100vh;
    display: flex;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, #E63E4E 0%, #B31E2C 100%);
  }

  /* ── Left brand panel ── */
  .rp-brand {
    width: 44%;
    min-height: 100vh;
    background: linear-gradient(145deg, #E63E4E 0%, #B31E2C 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 52px;
    position: relative;
    overflow: hidden;
  }
  .rp-brand::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 10%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 90%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  .rp-brand-inner { 
    position: relative; 
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .rp-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; }
  .rp-logo-icon { 
    width: 55px;
    height: 55px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }
  .rp-logo-name {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #fff;
  }

  .rp-brand h1 {
    font-size: clamp(34px, 3.5vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -1px;
    color: #fff;
    margin-bottom: 16px;
  }
  .rp-brand h1 em { 
    font-style: italic; 
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .rp-brand-sub {
    font-size: 15px;
    line-height: 1.65;
    opacity: 0.9;
    max-width: 340px;
    margin-bottom: 32px;
  }

  .rp-features { 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
    margin-bottom: 32px; 
  }
  .rp-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.9);
  }
  .rp-feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #fff;
    flex-shrink: 0;
  }

  .rp-stats {
    display: flex;
    gap: 24px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.2);
    margin-top: 0;
  }
  .rp-stat-item {
    flex: 1;
  }
  .rp-stat-num {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .rp-stat-lbl { 
    font-size: 12px; 
    opacity: 0.9; 
    text-transform: uppercase; 
    letter-spacing: .5px; 
    display: block;
  }

  /* ── Right form panel ── */
  .rp-form-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
    background: #f5f7fa;
  }

  .rp-form-card {
    width: 100%;
    max-width: 440px;
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    animation: slideUp 0.5s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .rp-back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #718096;
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 24px;
    transition: color var(--transition);
  }
  .rp-back-link:hover {
    color: #E63E4E;
  }

  .rp-form-header { margin-bottom: 32px; text-align: center; }
  .rp-form-header h2 {
    font-size: 30px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 8px;
  }
  .rp-form-header p { 
    font-size: 14px; 
    color: #718096; 
  }

  /* Alert banner */
  .rp-alert {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
    border-radius: var(--radius);
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 20px;
    border: 1px solid;
    animation: fadeIn .2s ease;
  }
  .rp-alert.error { 
    background: #f8d7da; 
    border-color: #f5c6cb; 
    color: #721c24; 
  }
  .rp-alert.success { 
    background: #d4edda; 
    border-color: #c3e6cb; 
    color: #155724; 
  }
  .rp-alert.warning { 
    background: #fff3cd; 
    border-color: #ffeeba; 
    color: #856404; 
  }
  .rp-alert-icon { margin-top: 1px; flex-shrink: 0; }

  /* Form fields */
  .rp-fields { display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px; }

  .rp-field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .3px;
    color: #4a5568;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .rp-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .rp-input-icon {
    position: absolute;
    left: 14px;
    color: #a0aec0;
    font-size: 14px;
    pointer-events: none;
    transition: color var(--transition);
  }
  .rp-input-wrap:focus-within .rp-input-icon { color: #E63E4E; }

  .rp-input {
    width: 100%;
    padding: 13px 14px 13px 40px;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    color: #2d3748;
    font-size: 14px;
    outline: none;
    transition: all var(--transition);
  }
  .rp-input::placeholder { color: #cbd5e0; }
  .rp-input:focus {
    border-color: #E63E4E;
    box-shadow: 0 0 0 3px rgba(230, 62, 78, 0.1);
  }
  .rp-input.is-error { 
    border-color: #f56565; 
    background-color: #fff5f5;
  }
  .rp-input:disabled { 
    opacity: .6; 
    cursor: not-allowed;
    background: #f7fafc;
  }

  .rp-eye-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #a0aec0;
    font-size: 15px;
    display: flex;
    align-items: center;
    padding: 4px;
    transition: color var(--transition);
  }
  .rp-eye-btn:hover { color: #4a5568; }

  .rp-error-text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #f56565;
    margin-top: 5px;
  }

  /* Password strength */
  .rp-strength { margin-top: 8px; }
  .rp-strength-bar {
    height: 4px;
    border-radius: 2px;
    background: #e2e8f0;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .rp-strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: width .3s ease, background .3s ease;
  }
  .rp-strength-label { 
    font-size: 11px; 
    font-weight: 500;
  }

  /* Password requirements */
  .rp-requirements {
    font-size: 11px;
    color: #6B7280;
    margin-top: 8px;
    padding: 8px;
    background: #F9FAFB;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }
  .rp-requirements strong {
    display: block;
    margin-bottom: 4px;
  }
  .rp-requirements ul {
    margin-left: 16px;
    list-style: none;
    padding: 0;
  }
  .rp-requirements li {
    margin-bottom: 2px;
  }

  /* Submit button */
  .rp-submit {
    width: 100%;
    padding: 14px;
    background: linear-gradient(145deg, #E63E4E, #B31E2C);
    border: none;
    border-radius: var(--radius);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all var(--transition);
    margin-top: 16px;
    position: relative;
    overflow: hidden;
  }
  .rp-submit::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  .rp-submit:hover::before { left: 100%; }
  .rp-submit:hover:not(:disabled) { 
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(230, 62, 78, 0.4);
  }
  .rp-submit:active:not(:disabled) { transform: scale(.98); }
  .rp-submit:disabled { 
    opacity: .6; 
    cursor: not-allowed;
  }

  .rp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
  }

  /* Success state */
  .rp-success {
    text-align: center;
    padding: 20px 0;
  }
  .rp-success-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #E63E4E, #B31E2C);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    margin: 0 auto 24px;
    box-shadow: 0 10px 25px rgba(230, 62, 78, 0.3);
  }
  .rp-success h2 {
    font-size: 24px;
    color: #2d3748;
    margin-bottom: 12px;
  }
  .rp-success p {
    color: #718096;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 8px;
  }
  .rp-success-note {
    font-size: 13px;
    color: #a0aec0;
    margin-top: 16px;
  }

  /* Footer */
  .rp-footer {
    margin-top: 32px;
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
  }
  .rp-footer p {
    font-size: 14px;
    color: #718096;
  }
  .rp-footer a {
    color: #E63E4E;
    text-decoration: none;
    font-weight: 600;
    margin-left: 4px;
  }
  .rp-footer a:hover {
    text-decoration: underline;
  }

  /* Emergency notice */
  .rp-emergency {
    margin-top: 24px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
    border-radius: var(--radius);
    background: #fff5f5;
    border: 1px solid #fed7d7;
    font-size: 13px;
    line-height: 1.5;
    color: #742a2a;
  }
  .rp-emergency strong { 
    color: #B31E2C; 
    font-weight: 600;
  }
  .rp-emergency a { 
    color: #B31E2C; 
    text-decoration: none; 
    font-weight: 500;
    margin-left: 4px;
  }
  .rp-emergency a:hover { 
    text-decoration: underline; 
  }
  .rp-emergency-icon { 
    color: #B31E2C; 
    margin-top: 1px; 
    flex-shrink: 0; 
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Responsive */
  @media (max-width: 820px) {
    .rp-brand { display: none; }
    .rp-form-card { padding: 32px 24px; }
  }
`,K=t=>{if(!t)return null;let o=0;return t.length>=8&&o++,t.length>=12&&o++,/[A-Z]/.test(t)&&o++,/[0-9]/.test(t)&&o++,/[^A-Za-z0-9]/.test(t)&&o++,o<=1?{label:"Weak",color:"#f56565",width:"25%"}:o<=3?{label:"Fair",color:"#ecc94b",width:"55%"}:o===4?{label:"Good",color:"#48bb78",width:"78%"}:{label:"Strong",color:"#48bb78",width:"100%"}},J=()=>{const{token:t}=O(),o=$(),[s,A]=n.useState({password:"",confirmPassword:""}),[j,L]=n.useState(!1),[y,T]=n.useState(!1),[I,q]=n.useState(!1),[m,N]=n.useState(!1),[i,v]=n.useState({}),[l,c]=n.useState(null),[f,k]=n.useState({}),[Y,h]=n.useState(!0),[D,E]=n.useState(!0);n.useEffect(()=>{t?(async()=>{try{(await(await fetch(`${B}/auth/verify-reset-token/${t}`)).json()).valid?h(!0):(h(!1),c({type:"error",message:"This password reset link is invalid or has expired. Please request a new one."}))}catch(a){console.error("Token verification error:",a),h(!1),c({type:"error",message:"Unable to verify reset link. Please try again or request a new one."})}finally{E(!1)}})():(h(!1),E(!1))},[t]);const S=r=>{const{name:a,value:p}=r.target;A(d=>({...d,[a]:p})),k(d=>({...d,[a]:!0})),i[a]&&v(d=>({...d,[a]:""})),l&&c(null)},P=r=>{k(a=>({...a,[r]:!0}))},U=()=>{const r={};return s.password?s.password.length<8?r.password="Password must be at least 8 characters":/[A-Z]/.test(s.password)?/[0-9]/.test(s.password)||(r.password="Must contain at least one number"):r.password="Must contain at least one uppercase letter":r.password="Password is required",s.password!==s.confirmPassword&&(r.confirmPassword="Passwords do not match"),r},V=async r=>{r.preventDefault();const a=U();if(Object.keys(a).length>0){v(a);return}N(!0),c(null);try{const p=await fetch(`${B}/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t,password:s.password})}),d=await p.json();if(!p.ok){c({type:"error",message:d.message||"Failed to reset password. Please try again."}),N(!1);return}q(!0),setTimeout(()=>{o("/login")},3e3)}catch(p){console.error("Reset password error:",p),c({type:"error",message:"Network error. Please check your connection and try again."}),N(!1)}},x=K(s.password);return D?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:w}),e.jsxs("div",{className:"rp-root",children:[e.jsx("div",{className:"rp-brand",children:e.jsx("div",{className:"rp-brand-inner",children:e.jsxs("div",{className:"rp-logo",children:[e.jsx("span",{children:e.jsx("img",{src:g,alt:"Strokify Logo",className:"logo-icon"})}),e.jsx("span",{className:"rp-logo-name",children:"Strokify"})]})})}),e.jsx("div",{className:"rp-form-panel",children:e.jsxs("div",{className:"rp-form-card",style:{textAlign:"center"},children:[e.jsx("div",{className:"rp-spinner",style:{margin:"40px auto"}}),e.jsx("p",{children:"Verifying your reset link..."})]})})]})]}):Y?I?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:w}),e.jsxs("div",{className:"rp-root",children:[e.jsx("div",{className:"rp-brand",children:e.jsxs("div",{className:"rp-brand-inner",children:[e.jsxs("div",{className:"rp-logo",children:[e.jsx("span",{children:e.jsx("img",{src:g,alt:"Strokify Logo",className:"logo-icon"})}),e.jsx("span",{className:"rp-logo-name",children:"Strokify"})]}),e.jsxs("h1",{children:["Password",e.jsx("br",{}),e.jsx("em",{children:"Reset"})]}),e.jsx("p",{className:"rp-brand-sub",children:"Your password has been successfully updated."})]})}),e.jsx("div",{className:"rp-form-panel",children:e.jsx("div",{className:"rp-form-card",children:e.jsxs("div",{className:"rp-success",children:[e.jsx("div",{className:"rp-success-icon",children:e.jsx(z,{})}),e.jsx("h2",{children:"Password Reset Successfully!"}),e.jsx("p",{children:"Your password has been updated."}),e.jsx("p",{className:"rp-success-note",children:"Redirecting to login..."})]})})})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:w}),e.jsxs("div",{className:"rp-root",children:[e.jsx("div",{className:"rp-brand",children:e.jsxs("div",{className:"rp-brand-inner",children:[e.jsxs("div",{className:"rp-logo",children:[e.jsx("span",{children:e.jsx("img",{src:g,alt:"Strokify Logo",className:"logo-icon"})}),e.jsx("span",{className:"rp-logo-name",children:"Strokify"})]}),e.jsxs("h1",{children:["Set New",e.jsx("br",{}),e.jsx("em",{children:"Password"})]}),e.jsx("p",{className:"rp-brand-sub",children:"Create a strong password to secure your account."}),e.jsx("div",{className:"rp-features",children:["Secure encryption","Strong password required","Instant update","Back to monitoring"].map(r=>e.jsxs("div",{className:"rp-feature",children:[e.jsx("span",{className:"rp-feature-dot"}),r]},r))}),e.jsxs("div",{className:"rp-stats",children:[e.jsxs("div",{className:"rp-stat-item",children:[e.jsx("span",{className:"rp-stat-num",children:"50K+"}),e.jsx("span",{className:"rp-stat-lbl",children:"LIVES PROTECTED"})]}),e.jsxs("div",{className:"rp-stat-item",children:[e.jsx("span",{className:"rp-stat-num",children:"95%"}),e.jsx("span",{className:"rp-stat-lbl",children:"ACCURACY"})]}),e.jsxs("div",{className:"rp-stat-item",children:[e.jsx("span",{className:"rp-stat-num",children:"24/7"}),e.jsx("span",{className:"rp-stat-lbl",children:"SUPPORT"})]})]})]})}),e.jsx("div",{className:"rp-form-panel",children:e.jsxs("div",{className:"rp-form-card",children:[e.jsxs(b,{to:"/login",className:"rp-back-link",children:[e.jsx(M,{})," Back to Login"]}),e.jsxs("div",{className:"rp-form-header",children:[e.jsx("h2",{children:"Set New Password"}),e.jsx("p",{children:"Enter your new password below"})]}),l&&e.jsxs("div",{className:`rp-alert ${l.type}`,children:[e.jsx("span",{className:"rp-alert-icon",children:e.jsx(u,{})}),e.jsx("span",{children:l.message})]}),e.jsxs("form",{onSubmit:V,noValidate:!0,children:[e.jsxs("div",{className:"rp-fields",children:[e.jsxs("div",{className:"rp-field",children:[e.jsx("label",{children:"New Password"}),e.jsxs("div",{className:"rp-input-wrap",children:[e.jsx(C,{className:"rp-input-icon"}),e.jsx("input",{className:`rp-input${i.password&&f.password?" is-error":""}`,type:j?"text":"password",name:"password",value:s.password,onChange:S,onBlur:()=>P("password"),placeholder:"Enter new password",disabled:m,autoComplete:"new-password",style:{paddingRight:42}}),e.jsx("button",{type:"button",className:"rp-eye-btn",onClick:()=>L(!j),tabIndex:-1,children:j?e.jsx(F,{}):e.jsx(R,{})})]}),i.password&&f.password&&e.jsxs("span",{className:"rp-error-text",children:[e.jsx(u,{style:{fontSize:11}}),i.password]}),s.password&&x&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"rp-strength",children:[e.jsx("div",{className:"rp-strength-bar",children:e.jsx("div",{className:"rp-strength-fill",style:{width:x.width,background:x.color}})}),e.jsxs("span",{className:"rp-strength-label",style:{color:x.color},children:[x.label," password"]})]}),e.jsxs("div",{className:"rp-requirements",children:[e.jsx("strong",{children:"Password requirements:"}),e.jsxs("ul",{children:[e.jsxs("li",{style:{color:s.password.length>=8?"#10B981":"#6B7280"},children:[s.password.length>=8?"✓":"○"," At least 8 characters"]}),e.jsxs("li",{style:{color:/[A-Z]/.test(s.password)?"#10B981":"#6B7280"},children:[/[A-Z]/.test(s.password)?"✓":"○"," At least one uppercase letter"]}),e.jsxs("li",{style:{color:/[0-9]/.test(s.password)?"#10B981":"#6B7280"},children:[/[0-9]/.test(s.password)?"✓":"○"," At least one number"]})]})]})]})]}),e.jsxs("div",{className:"rp-field",children:[e.jsx("label",{children:"Confirm New Password"}),e.jsxs("div",{className:"rp-input-wrap",children:[e.jsx(C,{className:"rp-input-icon"}),e.jsx("input",{className:`rp-input${i.confirmPassword&&f.confirmPassword?" is-error":""}`,type:y?"text":"password",name:"confirmPassword",value:s.confirmPassword,onChange:S,onBlur:()=>P("confirmPassword"),placeholder:"Confirm new password",disabled:m,autoComplete:"new-password",style:{paddingRight:42}}),e.jsx("button",{type:"button",className:"rp-eye-btn",onClick:()=>T(!y),tabIndex:-1,children:y?e.jsx(F,{}):e.jsx(R,{})})]}),i.confirmPassword&&f.confirmPassword&&e.jsxs("span",{className:"rp-error-text",children:[e.jsx(u,{style:{fontSize:11}}),i.confirmPassword]})]})]}),e.jsx("button",{type:"submit",className:"rp-submit",disabled:m,children:m?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"rp-spinner"}),"Resetting..."]}):e.jsxs(e.Fragment,{children:["Reset Password ",e.jsx(z,{style:{fontSize:13}})]})})]}),e.jsxs("div",{className:"rp-emergency",children:[e.jsx(Z,{className:"rp-emergency-icon"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Stroke emergency?"})," Do not wait — call 911 immediately.",e.jsx(b,{to:"/lifesync",children:"Emergency Resources →"})]})]})]})})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:w}),e.jsxs("div",{className:"rp-root",children:[e.jsx("div",{className:"rp-brand",children:e.jsxs("div",{className:"rp-brand-inner",children:[e.jsxs("div",{className:"rp-logo",children:[e.jsx("span",{children:e.jsx("img",{src:g,alt:"Strokify Logo",className:"logo-icon"})}),e.jsx("span",{className:"rp-logo-name",children:"Strokify"})]}),e.jsxs("h1",{children:["Password",e.jsx("br",{}),e.jsx("em",{children:"Reset"})]}),e.jsx("p",{className:"rp-brand-sub",children:"Secure your account with a new password."}),e.jsxs("div",{className:"rp-stats",children:[e.jsxs("div",{className:"rp-stat-item",children:[e.jsx("span",{className:"rp-stat-num",children:"50K+"}),e.jsx("span",{className:"rp-stat-lbl",children:"LIVES PROTECTED"})]}),e.jsxs("div",{className:"rp-stat-item",children:[e.jsx("span",{className:"rp-stat-num",children:"95%"}),e.jsx("span",{className:"rp-stat-lbl",children:"ACCURACY"})]}),e.jsxs("div",{className:"rp-stat-item",children:[e.jsx("span",{className:"rp-stat-num",children:"24/7"}),e.jsx("span",{className:"rp-stat-lbl",children:"SUPPORT"})]})]})]})}),e.jsx("div",{className:"rp-form-panel",children:e.jsxs("div",{className:"rp-form-card",children:[e.jsx("div",{className:"rp-form-header",children:e.jsx("h2",{children:"Invalid Reset Link"})}),l&&e.jsxs("div",{className:`rp-alert ${l.type}`,children:[e.jsx("span",{className:"rp-alert-icon",children:e.jsx(u,{})}),e.jsx("span",{children:l.message})]}),e.jsx(b,{to:"/forgot-password",className:"rp-submit",style:{textAlign:"center",textDecoration:"none"},children:"Request New Link"}),e.jsx("div",{className:"rp-footer",children:e.jsxs("p",{children:["Remember your password? ",e.jsx(b,{to:"/login",children:"Sign In"})]})})]})})]})]})};export{J as default};
