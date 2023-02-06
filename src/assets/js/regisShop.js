/**
Core script to handle the entire theme and core functions
**/
var Home = {
    url: '/Auth/',
    phoneOrEmail: '',
    otp: '',

    //data- target="#RegisterShopRetrievalPopupModal"
    showPopupRequestShopRetrieval: function() {
        {
            console.log(abp.localization.localize('SMGPleaseInputCaptcha'));
            var formRequestShop = $("#frm-shop-regis");
            formRequestShop[0].reset();
            $("#RegisterShopRetrievalPopupModal").modal('show');
        };
    },

    Init: function() {
        //validate shop truy xuất

        var formRegis = $("#frm-shop-regis");
        if (formRegis.length != 0) {
            $('input').on('blur', function() {

                if (formRegis.valid()) {
                    $('#shop-regis').prop('disabled', false);
                } else {
                    $('#shop-regis').prop('disabled', 'disabled');
                }
            });
            formRegis.validate({
                rules: {
                    CompanyName: "required",
                    Phone: "required",
                },
                messages: {
                    CompanyName: "Vui lòng nhập tên công ty",
                    Phone: "Vui lòng nhập số điện thoại",
                }
            });
        }
    },
    regisRequestShop: function() {
        if ($("#frm-shop-regis").valid()) {
            let data = $('#frm-shop-regis').serialize();
            $.ajax({
                type: "POST",
                cache: false,
                url: this.url + 'RegisRequestShop',
                dataType: "json",
                data: data,
                success: function(res) {
                    console.log(res.result.data);
                    $.notify(abp.localization.localize("SMGRegisSuccess"), "success");

                    $('#RegisterShopRetrievalPopupModal').modal('toggle');
                    $('#frm-shop-regis input[type="text"]').val('');
                },
                error: function(err) {
                    alert(err);
                }
            })
        }
    },
    InitRegisShopNormal: function() {
        let form_step = $("#form_body");
        let btn_step1 = $("#btn_step1");
        if (form_step.length != 0) {
            $('input').on('keyup', function() {
                if (form_step.valid()) {
                    btn_step1.prop('disabled', false);
                } else {
                    btn_step1.prop('disabled', 'disabled');
                }
            });
            form_step.validate({
                rules: {
                    PhoneOrEmail: "required",
                },
                messages: {
                    PhoneOrEmail: abp.localization.localize('SMGSmgPleaseInputEmailOrPhone'),

                }
            });
        }
        //click dropdown button language
        $(".btn_language").click(function() {
            $(".list_language").slideToggle();
        });
    },
    clickStep1: function() {
        let form_step = $("#form_body");
        let body_step = $("#body_step");
        if (form_step.valid()) {
            let PhoneOrEmail = $("#PhoneOrEmail").val();

            let btn_step1 = $("#btn_step1");
            var msg1 = '';

            if (COMMON.validateEmail(PhoneOrEmail) || COMMON.validatePhoneNumber(PhoneOrEmail)) {
                if (COMMON.validateEmail(PhoneOrEmail)) {
                    msg1 += "email " + PhoneOrEmail;
                } else {
                    msg1 += "số điện thoại " + PhoneOrEmail;
                }
                var msg = abp.localization.localize('SMGSmgSendOtp');
                this.phoneOrEmail = PhoneOrEmail;
                //tạo giao diện step 2
                body_step.empty();
                let form_step2 = " <form id='form_body'><div class='regis-body' id='step2'>";
                form_step2 += "<h3><i class='fa fa-chevron-left' aria-hidden='true'></i>" + abp.localization.localize('SMGPleaseInputCaptcha') + "</h3>";
                form_step2 += "<p>" + msg + "</p>";
                form_step2 += "<div class='row'>";
                form_step2 += "<div class='col-md-12 reg-input'>";
                form_step2 += "<div id='otp' class='inputs d-flex flex-row justify-content-center'> <input class='m-2 text-center form-control rounded' type='text' name='first' id='first' maxlength='1' /> <input class='m-2 text-center form-control rounded' type='text' name='second' id='second' maxlength='1' /> <input class='m-2 text-center form-control rounded' type='text' name='third' id='third' maxlength='1' /> <input class='m-2 text-center form-control rounded' type='text' name='fourth' id='fourth' maxlength='1' /> <input class='m-2 text-center form-control rounded' type='text' name='fifth' id='fifth' maxlength='1' /> <input class='m-2 text-center form-control rounded' type='text' name='sixth' id='sixth' maxlength='1' /> </div>";
                form_step2 += "</div>";
                form_step2 += "<div class='msg col-md-12 text-error' style='display:none'>";
                form_step2 += "</div>";
                form_step2 += "</div>";
                form_step2 += "<div class='row row-regis'>";
                form_step2 += "<div class='col-md-12 reg-btn'>";
                form_step2 += "<button type='button' id='btn_step2' onclick='Home.clickStep2()' disabled class='btn btn-primary-smartgap'>" + abp.localization.localize('SMGButtonVerificationOtp') + "</button>";
                form_step2 += "<p><a href='javascript:Home.SenOtp()'>" + abp.localization.localize('SMGButtonSendOtpAgain') + "</a></p>";
                form_step2 += "<p>" + abp.localization.localize('SMGSmgExpiredOtp') + "</p>"
                form_step2 += "<p><span id='count_down'></span></p>"
                form_step2 += "</div>";
                form_step2 += "</div>";
                form_step2 += "</div></form>";
                body_step.append(form_step2);
                $('#first').focus();
                Home.OTPInput();
                //Gửi mã otp vào số dt or email
                Home.SenOtp();
            } else {
                $("#PhoneOrEmail").val('');
                $(".msg").show();
                $(".msg").html(abp.localization.localize('SMGSmgErrorEmailOrPhone'));

                $(".msg").fadeTo(6000, 1000).slideUp(1000, function() {
                    $(".msg").slideUp(1000);
                });
            }
        }

    },
    SenOtp: function() {
        $.ajax({
            type: "POST",
            cache: false,
            url: this.url + 'SendOtpReg',
            dataType: "json",
            data: {
                emailOrPhone: this.phoneOrEmail,
                captcha: ""
            },
            success: function(res) {
                Home.countDownOTP();
            },
            error: function(err) {
                alert(err);
            }
        })
    },
    OTPInput: function() {
        //validate
        let form_step = $("#form_body");
        let btn_step2 = $("#btn_step2");
        $('input').on('keyup', function() {
            if (form_step.valid()) {
                btn_step2.prop('disabled', false);
            } else {
                btn_step2.prop('disabled', 'disabled');
            }
        });
        form_step.validate({
            rules: {
                first: "required",
                second: "required",
                third: "required",
                fourth: "required",
                fifth: "required",
                sixth: "required",
            },
            messages: {
                first: "",
                second: "",
                third: "",
                fourth: "",
                fifth: "",
                sixth: "",
            }
        });
        const inputs = document.querySelectorAll('#otp > *[id]');
        for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function(event) { if (event.key === "Backspace") { inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus(); } else { if (i === inputs.length - 1 && inputs[i].value !== '') { return true; } else if (event.keyCode > 47 && event.keyCode < 58) { inputs[i].value = event.key; if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault(); } else if (event.keyCode > 64 && event.keyCode < 91) { inputs[i].value = String.fromCharCode(event.keyCode); if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault(); } } }); }
    },
    clickStep2: function() {
        //check otp
        this.otp = $('#first').val() + $('#second').val() + $('#third').val() + $('#fourth').val() + $('#fifth').val() + $('#sixth').val();
        $.ajax({
            type: "POST",
            cache: false,
            url: this.url + 'CheckOtpReg',
            dataType: "json",
            data: {
                emailOrPhone: this.phoneOrEmail,
                otp: this.otp
            },
            success: function(res) {
                //console.log(JSON.stringify(res));
                //tạo giao diện b3
                let form_step = $("#form_body");
                let body_step = $("#body_step");
                body_step.empty();
                var otp = res.result;
                let form_step3 = " <form id='form_body'><div class='regis-body' id='step3'>";
                form_step3 += "<h3><i class='fa fa-chevron-left' aria-hidden='true'></i>" + abp.localization.localize('SMGTitleSetPasword') + "</h3>";
                form_step3 += "<p>" + abp.localization.localize('SMGSmgSetPasword') + "</p>";
                form_step3 += "<div class='row row-regis'>";
                form_step3 += "<div class='col-md-12 reg-input'>";
                form_step3 += "<input class='form-control' type='password' name='password_field' id='password_field' placeholder='Mật khẩu' />";
                form_step3 += "<span toggle='#password_field' class='fa fa-fw fa-eye-slash field-icon toggle-password'></span>";
                form_step3 += "<p>8-16 ký tự</p>";
                form_step3 += "<p class='title-warning'>Chỉ các chữ cái,số và ký tự phổ biến mới có thể được sử dụng.</p>";
                form_step3 += "</div>";
                form_step3 += "<div class='msg col-md-12 text-error' style='display:none'></div>";
                form_step3 += "</div>";
                form_step3 += "<div class='row row-regis'>";
                form_step3 += "<div class='col-md-12 reg-btn'>";
                form_step3 += "<button type='button' id='btn_step3' onclick='Home.clickStep3(" + otp + ")' class='btn btn-primary-smartgap'>" + abp.localization.localize('SMGButtonRegis') + "</button>";

                form_step3 += "</div>";
                form_step3 += "</div>";
                form_step3 += "</div></form>";
                body_step.append(form_step3);
                $('#password_field').focus();
                Home.showEyePas();
            },
            error: function(err) {
                //alert(JSON.stringify(err));
                $('.msg').show().html(abp.localization.localize('SMGSmgOtpInvalid'));
                $(".msg").fadeTo(6000, 1000).slideUp(1000, function() {
                    $(".msg").slideUp(1000);
                });
            }
        })

    },

    showEyePas: function() {
        $(".toggle-password").click(function() {
            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
    },
    clickStep3: function(otp) {
        //check pas
        let data_pasw = $('#password_field').val();
        $.ajax({
            type: "POST",
            cache: false,
            url: this.url + 'RegisNormalShop',
            dataType: "json",
            data: {
                Email: this.phoneOrEmail,
                UserName: this.phoneOrEmail,
                Password: data_pasw,
                Otp: otp
            },
            success: function(res) {
                $.notify(abp.localization.localize("SMGRegisSuccess"), "success");
                //redirec tới trang đăng nhập shop thường
                window.location.href = "/";
            },
            error: function(err) {
                alert(JSON.stringify(err));
            }
        })
    },

    countDownOTP: function() {
        // Set the date we're counting down to
        //document.getElementById("count_down").innerHTML = '';
          clearInterval(countDownDate); 
       
        $('#count_down').html('');

        $('#count_down').empty().removeClass('text-error');
        console.log("llllllllllll")
        var d = new Date();
        var v = new Date();
        v.setMinutes(d.getMinutes() + 5);
        var countDownDate = v.getTime();
        // Update the count down every 1 second
        var minutes = 0;
        var seconds = 0;
        clearInterval(x);
        var x = setInterval(function() {
           
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            $('#count_down').html('Hết hạn sau thời gian: ' + minutes + ":" + seconds);

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                $('#count_down').html("Mã xác minh đã hết thời hạn.").addClass('text-error');
            }
        }, 1000);

    },

    
    Login: function() {
        let data = $('#frm-login').serialize();
        $.ajax({
            type: "POST",
            cache: false,
            url: this.url + 'Login',
            dataType: "json",
            data: data,
            success: function(res) {
                if (res.result.code == 1) {
                    $.notify("Đăng nhập thành công.", "success");
                    $('#dangnhap').modal('toggle');
                    $('#frm-login input[type="text"]').val('');
                } else {
                    $('#frm-login input[type="text"]').val('');
                    $("#frm-error").html("Tên tài khoản hoặc password không đúng !");
                }

            },
            error: function(err) {
                alert(err);
            }
        });

    }
}
