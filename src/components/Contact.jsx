import { useState } from 'react';
import { INTERESTS } from '../data.js';
import Btn from './Btn.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    setSent(true);
    f.reset();
  };

  return (
    <section className="contact wrap" id="contact">
      <div className="contact-grid">
        <div>
          <span className="eyebrow rv">Contact</span>
          <h2 className="rv rv-d1">Let's build<br /><em className="serif">together.</em></h2>
          <div className="info rv rv-d2">
            <div><b>Head office</b>Mall Admin Office, Lower West Lane, Robinsons Galleria, EDSA corner Ortigas Avenue, Ugong Norte, Quezon City, Philippines</div>
            <div><b>Phone</b><a href="tel:+63283971888">+632 8397 1888</a></div>
          </div>
        </div>
        <form className="rv rv-d1" noValidate onSubmit={onSubmit}>
          <div>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 12 }}>I'm interested in</p>
            <div className="chips">
              {INTERESTS.map(v => (
                <label key={v} className="chip"><input type="checkbox" name="interest" value={v} /><span>{v}</span></label>
              ))}
            </div>
          </div>
          <div className="row2">
            <div className="field"><input id="fn" type="text" placeholder=" " required /><label htmlFor="fn">Full name</label></div>
            <div className="field"><input id="em" type="email" placeholder=" " required /><label htmlFor="em">Email address</label></div>
          </div>
          <div className="field"><input id="ph" type="tel" placeholder=" " /><label htmlFor="ph">Phone number</label></div>
          <div className="field"><textarea id="msg" rows={3} placeholder=" " /><label htmlFor="msg">Your message</label></div>
          <label className="consent"><input type="checkbox" required /> I agree to the processing of my personal data in line with the Privacy Notice.</label>
          <div className="form-trust"><img src="/assets/npc-seal.png" alt="" /><span>Your details are handled under the Data Privacy Act. Robinsons Land is <b>NPC DPO/DPS registered</b>.</span></div>
          <div className="form-ok" style={sent ? { display: 'block' } : undefined}>Thank you. Our team will reach out within two working days.</div>
          <Btn as="button" type="submit" style={{ justifySelf: 'start' }}>Send enquiry</Btn>
        </form>
      </div>
    </section>
  );
}
