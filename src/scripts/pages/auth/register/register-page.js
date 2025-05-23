import RegisterPresenter from './register-presenter';
import * as CeritaKuyAPI from '../../../data/api';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <section class="register-container">
        <div class="register-form-container">
          <h1 class="register__title">Buat Akun Baru</h1>

          <form id="register-form" class="register-form">
            <div class="form-control">
              <label for="name-input" class="register-form__name-title">Nama Lengkap <span style="color: red">*</span></label>

              <div class="register-form__title-container">
                <input id="name-input" type="text" name="name" placeholder="Masukkan nama lengkap Anda">
              </div>
            </div>
            <div class="form-control">
              <label for="email-input" class="register-form__email-title">Email <span style="color: red">*</span></label>

              <div class="register-form__title-container">
                <input id="email-input" type="email" name="email" placeholder="Contoh: nama@example.com">
              </div>
            </div>
            <div class="form-control">
              <label for="password-input" class="register-form__password-title">Kata Sandi <span style="color: red">*</span></label>

              <div class="register-form__title-container">
                <input id="password-input" type="password" name="password" placeholder="Masukkan kata sandi baru">
              </div>
            </div>
            <div class="form-buttons register-form__form-buttons">
              <div id="submit-button-container">
                <button class="btn submit-button" type="submit"><b>Daftar</b></button>
              </div>
            </div>
            <br></br>
            <div>
              <p class="register-form__already-have-account"> <a href="#/login">Sudah punya akun?<b></b></a></p>
              </div>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: CeritaKuyAPI,
    });

    this.#setupForm();
  }

  #setupForm() {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        password: document.getElementById('password-input').value,
      };
      await this.#presenter.getRegistered(data);
    });
  }

  registeredSuccessfully(message) {
    console.log(message);

    // Redirect
    location.hash = '/login';
  }

  registeredFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn submit-button" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Daftar
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn submit-button" type="submit"><b>Daftar</b></button>
    `;
  }
}
