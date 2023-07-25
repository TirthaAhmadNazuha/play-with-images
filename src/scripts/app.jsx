import { StateComponent, fullyPrepared } from 'amber';
import '../styles/index.sass';

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

  onFormSubmit() {
    const inp = this.element.querySelector('.formCompressing input');
    const res = fetch('.netlify/functions/compressing', {
      method: 'POST',
      files: inp.files
    });
    res.then((data) => console.log(data));
    res.catch((err) => console.error(err));
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
