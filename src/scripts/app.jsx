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
          file: <input type="file" name="image" id="img-inp" /><br />
          width: <input type="text" name="width" value="1080" /><br />
          qualty <input type="text" name="qualty" value="80" /><br />
          <button type="submit" onClick={() => this.onFormSubmit()}>Sumbit</button>
        </div>
        <img src="" alt="is will show image result" />
      </div >
    );
  }

  async onFormSubmit() {
    const [inp, width, qualty] = this.element.querySelectorAll('.formCompressing input');
    const imageFile = inp.files[0];
    try {
      const base64Image = await convertFileToBase64(imageFile);
      const type = imageFile.type.split('/')[1];
      const res = await fetch('.netlify/functions/compressing', {
        method: 'POST',
        body: JSON.stringify({ image: base64Image, width: Number(width.value) || null, qualty: Number(qualty.value || '0') || 100, type: type === 'jpg' ? 'jpeg' : type })
      });
      const data = await res.text();
      const img = this.element.querySelector('img');
      img.src = `data:image/${type};base64,${data}`;
      img.name = imageFile.name;
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
