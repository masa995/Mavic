$(function () {
  const form = $('.js-form');

  form.validate({
    focusInvalid: false,
    rules: {
      name: {
        required: true,
      },

      email: {
        required: true,
      }
    },

    messages: {
      name: {
        required: 'Введите имя'
      },

      email: {
        required: 'Введите email',
        email: 'Неверный формат email'
      }
    },
    submitHandler(form) {
      console.log("Валидация успешна!");
      let validator = $(form).validate();
      validator.resetForm();
      $(form).get(0).reset();
    }
  });
});
