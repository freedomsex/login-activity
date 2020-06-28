<script>
import CaptchaImage from '@freedomsex/captcha-image';
import RemindLogin from './dialogs/RemindLogin';

export default {
  props: [],
  data() {
    return {
      form: {
        login: '',
        password: '',
        error: false,
      },
      captcha: {
        enabled: false,
        code: '',
        token: null,
      },
      remind: false,
      hint: 'Введите данные',
    };
  },
  components: {
    DefaultActivity: () => import('@freedomsex/activity-component'),
    CaptchaImage,
    RemindLogin,
  },
  mounted() {
    //
  },
  methods: {
    async send() {
      try {
        let data = await this.$service.run('login/send', {
          login: this.form.login,
          password: this.form.password,
          token: this.captcha.token,
          code: this.captcha.code,
        });
        this.onLogin(data);
      } catch (e) {
        this.onError(e);
      }
    },
    onLogin(data) {
      this.hint = 'Успешно. Подождите.';
      window.location.href = '/';
    },
    onError({error, say, strict}) {
      this.hint = say;
      if (strict || error == 'code') {
        this.captcha.enabled = true;
      }
      if (error == 'locked') {
        //
      }
      if (error == 'auth') {
        //
      }
      if (this.form.error && this.$refs.captcha) {
        this.$refs.captcha.refresh();
      }
      this.form.error = true;
    },
    setToken(token) {
      this.captcha.token = token;
    },
    setCode(code) {
      this.captcha.code = code;
    },
  },
};
</script>

<template>
  <DefaultActivity caption="Войти" type="wrapped" @close="$emit('close')">

    <div class="lofin-form">
      <div class="activity-section">
        <div class="activity-section__title">Ваш логин</div>
        <div class="field">
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <i class="material-icons">person</i>
            </span>
            <input class="input" type="text" v-model="form.login" placeholder="Введите логин">
          </div>
        </div>
      </div>

      <div class="activity-section">
        <div class="activity-section__title">Пароль</div>
        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <i class="material-icons">vpn_key</i>
          </span>
          <input class="input" type="text" v-model="form.password" placeholder="Введите пароль">
        </div>
      </div>

      <div class="activity-section" v-if="form.error && captcha.enabled">
        <div class="activity-section__title">Код</div>
        <CaptchaImage ref="captcha" @token="setToken" @input="setCode"/>
      </div>
    </div>

    <div class="activity-section">
      <div class="buttons">
        <button class="button is-primary" @click="send">
          Войти
        </button>
        <button class="button" @click="remind = true">
          Не помню
        </button>
      </div>
    </div>

    <div class="activity-section">
      {{hint}}
    </div>

    <RemindLogin v-if="remind" @close="remind = false"/>
  </DefaultActivity>
</template>

<style lang="less">

</style>
