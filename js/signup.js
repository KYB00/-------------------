(function () {
  function ModalSignin(element) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName("js-signin-modal-block");
    this.switchers = this.element
      .getElementsByClassName("js-signin-modal-switcher")[0]
      .getElementsByTagName("a");
    this.triggers = document.getElementsByClassName("js-signin-modal-trigger");
    this.hidePassword = this.element.getElementsByClassName("js-hide-password");
    this.init();
  }

  ModalSignin.prototype.init = function () {
    var self = this;
    for (var i = 0; i < this.triggers.length; i++) {
      (function (i) {
        self.triggers[i].addEventListener("click", function (event) {
          if (event.target.hasAttribute("data-signin")) {
            event.preventDefault();
            self.showSigninForm(event.target.getAttribute("data-signin"));
          }
        });
      })(i);
    }

    this.element.addEventListener("click", function (event) {
      if (
        hasClass(event.target, "js-signin-modal") ||
        hasClass(event.target, "js-close")
      ) {
        event.preventDefault();
        removeClass(self.element, "cd-signin-modal--is-visible");
      }
    });
    document.addEventListener("keydown", function (event) {
      event.which == "27" &&
        removeClass(self.element, "cd-signin-modal--is-visible");
    });

    for (var i = 0; i < this.hidePassword.length; i++) {
      (function (i) {
        self.hidePassword[i].addEventListener("click", function (event) {
          self.togglePassword(self.hidePassword[i]);
        });
      })(i);
    }

    // 로그인 submit 이벤트
    this.blocks[0]
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const regBusinessNo = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5})$/;

        if (
          !regBusinessNo.test(document.getElementById("signin-username").value)
        ) {
          self.toggleError(document.getElementById("signin-username"), true);
          document.getElementById("signin-username").focus();
        } else if (
          document.getElementById("signin-password").value.length < 4
        ) {
          alert("회원정보가 일치하지 않습니다");
          document.getElementById("signup-password").focus();
        } else {
          $.ajax({
            url: "./signinProcess.php",
            type: "POST",
            dataType: "json",
            data: $("#signinForm").serialize(),
          }).done(function (data) {
            console.log(data);
            if (!data.result) {
              alert("회원정보가 일치하지 않습니다");
              document.getElementById("signup-password").focus();
            } else {
              if (data.username == "000-00-00000") {
                location.href = "/admin/userList.php";
              } else {
                location.href = "/";
              }
            }
          });
        }
      });

    // 회원가입 submit 이벤트
    this.blocks[1]
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const regCellphone =
          /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
        const regEmail =
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (
          document.querySelectorAll('input[name="accept-terms"]:checked')
            .length !== 2
        ) {
          alert("이용약관에 동의하지 않았습니다");
          document.getElementById("accept-terms-all").focus();
        } else if (!document.getElementById("signup-username").value) {
          alert("아이디(사업자등록번호)가 입력되지 않았습니다");
          document.getElementById("signup-username").focus();
        } else if (
          document.getElementById("signup-password").value.length < 4
        ) {
          alert("비밀번호를 4자리 이상 입력하세요");
          document.getElementById("signup-password").focus();
        } else if (!document.getElementById("signup-name").value) {
          alert("대표자명이 입력되지 않았습니다");
          document.getElementById("signup-name").focus();
        } else if (!document.getElementById("signup-title").value) {
          alert("상호명이 입력되지 않았습니다");
          document.getElementById("signup-title").focus();
        } else if (
          !regCellphone.test(document.getElementById("signup-cellphone").value)
        ) {
          alert("휴대폰 번호가 올바르지 않습니다");
          document.getElementById("signup-cellphone").focus();
        } else if (!document.getElementById("signup-cellphone_cert").value) {
          alert("휴대폰이 인증되지 않습니다");
          document.getElementById("signup-cellphone").focus();
        } else if (
          !regEmail.test(document.getElementById("signup-email").value)
        ) {
          alert("이메일주소가 올바르지 않습니다");
          document.getElementById("signup-email").focus();
        } else if (
          !document.getElementById("signup-postcode").value ||
          !document.getElementById("signup-address").value ||
          !document.getElementById("signup-address_detail").value
        ) {
          alert("주소가 입력되지 않았습니다");
          document.getElementById("signup-postcode").focus();
        } else {
          document.getElementById("signup-submit").disabled = true;

          $.ajax({
            url: "./signupProcess.php",
            type: "POST",
            dataType: "json",
            data: $("#signupForm").serialize(),
          }).done(function (data) {
            document.getElementById("signup-submit").disabled = false;

            if (!data.result) {
              alert(
                "회원가입 중 오류가 발생했습니다. 관리자에게 문의하여 주세요."
              );
            } else {
              location.href = "/";
            }
          });
        }
      });

    // 패스워드 찾기 submit 이벤트
    this.blocks[2]
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const regCellphone =
          /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;

        if (
          !regCellphone.test(document.getElementById("reset-cellphone").value)
        ) {
          alert("휴대폰 번호가 올바르지 않습니다. 다시 입력하세요.");
        } else {
          $.ajax({
            url: "./sendSMSResetCode.php",
            type: "POST",
            dataType: "json",
            data: {
              cellphone: document.getElementById("reset-cellphone").value,
            },
          }).done(function (data) {
            if (!data.result) {
              self.toggleError(
                document.getElementById("reset-cellphone"),
                true
              );
              document.getElementById("reset-cellphone").focus();
            } else {
              alert("초기화된 패스워드를 가입하신 핸드폰 번호로 발송하였습니다.");
            }
          });
        }
      });

    // 회원가입 아이디 중복 검사 submit 이벤트
    this.blocks[3]
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const regBusinessNo = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5})$/;

        if (
          !regBusinessNo.test(document.getElementById("signup-username").value)
        ) {
          alert("사업자등록번호가 올바르지 않습니다");
          document.getElementById("signup-username").focus();
        } else {
          $.ajax({
            url: "./checkUsername.php",
            type: "POST",
            dataType: "json",
            data: {
              username: String(
                document.getElementById("signup-username").value
              ),
            },
          }).done(function (data) {
            console.log(data);
            if (!data.result) {
              alert("이미 가입된 사업자등록번호 입니다");
              self.showSigninForm("signup");
              document.getElementById("signup-username").value = "";
            } else {
              alert("가입된 이력이 없습니다. 회원가입 절차를 계속 진행하세요.");
              self.showSigninForm("signup");
            }
          });
        }
      });

    // 휴대폰 번호 인증 submit 이벤트
    this.blocks[4]
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const regCellphone =
          /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
        const regCellphoneCert = /^([0-9]{5})$/;

        if (
          !regCellphone.test(document.getElementById("signup-cellphone").value)
        ) {
          alert(
            "휴대폰 번호가 올바르지 않습니다. 뒤로가기 후 다시 입력하세요."
          );
          self.showSigninForm("signup");
        } else if (
          !regCellphoneCert.test(
            document.getElementById("signup-auth_code").value
          )
        ) {
          alert("휴대폰 인증번호가 올바르지 않습니다");
          document.getElementById("signup-auth_code").focus();
        } else {
          $.ajax({
            url: "./checkCellphone.php",
            type: "POST",
            dataType: "json",
            data: {
              cert: document.getElementById("signup-auth_code").value,
            },
          }).done(function (data) {
            if (!data.result) {
              self.toggleError(
                document.getElementById("signup-auth_code"),
                true
              );
              document.getElementById("signup-auth_code").focus();
            } else {
              alert("인증에 성공 하였습니다");
              document.getElementById("signup-cellphone_cert").value = "done";
              document.getElementById("signup-cellphone").readOnly = true;
              self.showSigninForm("signup");
            }
          });
        }
      });
  };

  ModalSignin.prototype.togglePassword = function (target) {
    var password = target.previousElementSibling;
    "password" == password.getAttribute("type")
      ? password.setAttribute("type", "text")
      : password.setAttribute("type", "password");
    target.textContent = "가리기" == target.textContent ? "보이기" : "가리기";
    putCursorAtEnd(password);
  };

  ModalSignin.prototype.showSigninForm = function (type) {
    !hasClass(this.element, "cd-signin-modal--is-visible") &&
      addClass(this.element, "cd-signin-modal--is-visible");
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].getAttribute("data-type") == type
        ? addClass(this.blocks[i], "cd-signin-modal__block--is-selected")
        : removeClass(this.blocks[i], "cd-signin-modal__block--is-selected");
    }
    var switcherType =
      type === "login" || type === "reset" ? "login" : "signup";
    for (var i = 0; i < this.switchers.length; i++) {
      this.switchers[i].getAttribute("data-type") == switcherType
        ? addClass(this.switchers[i], "cd-selected")
        : removeClass(this.switchers[i], "cd-selected");
    }
  };

  ModalSignin.prototype.toggleError = function (input, bool) {
    toggleClass(input, "cd-signin-modal__input--has-error", bool);
    toggleClass(
      input.nextElementSibling,
      "cd-signin-modal__error--is-visible",
      bool
    );
  };

  var signinModal = document.getElementsByClassName("js-signin-modal")[0];
  if (signinModal) {
    new ModalSignin(signinModal);
  }

  var mainNav = document.getElementsByClassName("js-main-nav")[0];
  if (mainNav) {
    mainNav.addEventListener("click", function (event) {
      if (hasClass(event.target, "js-main-nav")) {
        var navList = mainNav.getElementsByTagName("ul")[0];
        toggleClass(
          navList,
          "cd-main-nav__list--is-visible",
          !hasClass(navList, "cd-main-nav__list--is-visible")
        );
      }
    });
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(
        new RegExp("(\\s|^)" + className + "(\\s|$)")
      );
    }
  }

  function addClass(el, className) {
    var classList = className.split(" ");
    if (el.classList) {
      el.classList.add(classList[0]);
    } else if (!hasClass(el, classList[0])) {
      el.className += " " + classList[0];
    }
    if (classList.length > 1) {
      addClass(el, classList.slice(1).join(" "));
    }
  }

  function removeClass(el, className) {
    var classList = className.split(" ");
    if (el.classList) {
      el.classList.remove(classList[0]);
    } else if (hasClass(el, classList[0])) {
      var reg = new RegExp("(\\s|^)" + classList[0] + "(\\s|$)");
      el.className = el.className.replace(reg, " ");
    }
    if (classList.length > 1) {
      removeClass(el, classList.slice(1).join(" "));
    }
  }

  function toggleClass(el, className, bool) {
    if (bool) {
      addClass(el, className);
    } else {
      removeClass(el, className);
    }
  }

  function putCursorAtEnd(el) {
    if (el.setSelectionRange) {
      var len = el.value.length * 2;
      el.focus();
      el.setSelectionRange(len, len);
    } else {
      el.value = el.value;
    }
  }
})();
