import { StateComponent, fullyPrepared } from 'amber';
import '../styles/index.sass';

function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    // Read the file as a data URL (Base64-encoded string)
    reader.readAsDataURL(file);
  });
}

const App = class extends StateComponent {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  render() {
    this.onFormSubmit = this.onFormSubmit.bind(this);
    return (
      <div className="app">
        <h1>Play-with-images</h1>
        <h2>Compress images</h2>
        <div className="formCompressing">
          <input type="file" name="image" id="img-inp" />
          <button type="submit" onClick={() => this.onFormSubmit()}>Sumbit</button>
        </div>
      </div >
    );
  }

  async onFormSubmit() {
    const inp = this.element.querySelector('.formCompressing input');
    const imageFile = imageInput.files[0];
    try {
      const base64Image = await convertFileToBase64(imageFile);
      const res = await fetch('.netlify/functions/compressing', {
        method: 'POST',
        body: JSON.stringify({ image: base64Image })
      });
      const data = await res.text();
      console.log(data);
    } catch (err) { console.error(err); }
  }

  async onConnected() {
    await fullyPrepared();
    try {
      const res = await fetch('.netlify/functions/test');
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
};

export default App;
