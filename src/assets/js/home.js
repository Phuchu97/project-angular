/**
Core script to handle the entire theme and core functions
**/
var Home = {
    url: '/Auth/',
    //data- target="#RegisterShopRetrievalPopupModal"
    showPopupRegisShop: function () {
        {
             console.log(abp.localization.localize('Logout'));
            var formRegis = $("#frm-shop-regis");
            formRegis[0].reset();
            //$("#RegisterShopRetrievalPopupModal").modal('show');
        };
    },
    Init: function () {
        //validate shop truy xuất
       
        var formRegis = $("#frm-shop-regis");
        $('input').on('blur', function () {

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
                CompanyName: "Vui lòng nhập tên công ty sdsdsdsdsdsd",
                Phone: "Vui lòng nhập số điện thoại",
            }
        });
        //validate shop thường
        $('input').on('blur', function () {
            if ($("#frm-shop-normal").valid()) {
                $('#shop-regis-normal').prop('disabled', false);
                $('#shop-regis-step-2').prop('disabled', false);
            } else {
                $('#shop-regis-normal').prop('disabled', 'disabled');
                $('#shop-regis-step-2').prop('disabled', 'disabled');
            }
        });
        $("#frm-shop-normal").validate({
            rules: {
                PhoneOrEmail: "required",
                Otp: "required"
            },
            messages: {
                PhoneOrEmail: "Vui lòng nhập số điện thoại hoặc địa chỉ email.",
                Otp: "Vui lòng nhập otp."
            }
        });

    },
    regisRequestShop: function () {
        if ($("#frm-shop-regis").valid()) {
            let data = $('#frm-shop-regis').serialize();
            $.ajax({
                type: "POST",
                cache: false,
                url: this.url + 'RegisRequestShop',
                dataType: "json",
                data: data,
                success: function (res) {
                    console.log(res.result.data);
                    $.notify("Đăng ký thành công!Chúng tôi sẽ liên hệ lại với khách hàng sớm nhất.", "success");
                   
                    $('#RegisterShopRetrievalPopupModal').modal('toggle');
                    $('#frm-shop-regis input[type="text"]').val('');
                },
                error: function (err) {
                    alert(err);
                }
            })
        }
    },
    regisShopNormal: function () {
        let frmShopNormal = $("#frm-shop-normal");
        if (frmShopNormal.valid()) {
            let data = $("#PhoneOrEmail").val();

            //hiện form nhập OTP
            let bodyStep = $("#body-step");
            let buttonStep = $("#shop-regis-button");
            //check input là số điện thoại hay email

            let msg = "Thông báo đã gửi OTP về ";
            if (COMMON.validateEmail(data) || COMMON.validatePhoneNumber(data)) {
                bodyStep.empty();
                buttonStep.empty();
                if (COMMON.validateEmail(data)) {
                    msg += "email " + data;
                    $("#txtEmail").val(data);//gán lưu lại Phone or email đã nhập
                }
                else {
                    msg += "số điện thoại " + data; $("#txtPhoneNumber").val(data);//gán lưu lại Phone or email đã nhập
                }
                //count down
                msg += " .Vui lòng nhập mã OTP vào ô bên dưới";

                let labelMsg = ("<div class='row'><div class='col-md-12 form-group'>" + msg + "</div>");
                labelMsg += ("<div class='col-md-12 form-group'><label>NHẬP MÃ OTP</label><input placeholder='Nhập mã otp' name='Otp' id='Otp' type='text' class='form-control' /></div>");
                labelMsg += ("<div class='col-md-12 form-group text-center'><span id='count-down' class='badge-count-down badge rounded-pill bg-secondary'></span></div>");
                labelMsg += ("<div class='col-md-12 form-group text-center'><a href='#'>Gửi lại mã xác nhận</a></div>");
                labelMsg += ("</div>");
                bodyStep.append(labelMsg);
                Home.countDownOTP();
                //button next step
                //check nếu đúng OTP thì tiếp tục
                buttonStep.append("<button id='shop-regis-step-2' onclick='Home.regisShopNormalStep2()' type='button' class='btn btn-success' disabled='disabled'>Tiếp tục</button>");
                $('input').on('blur', function () {
                    if ($("#frm-shop-normal").valid()) {
                        $('#shop-regis-step-2').prop('disabled', false);
                    } else {
                        $('#shop-regis-step-2').prop('disabled', 'disabled');
                    }
                });
            }
            else {
                $("#PhoneOrEmail").val('');
                $.notify("Email hoặc số điện thoại không đúng.", "warring");
            }

        }

    },
    regisShopNormalStep2: function () {
        //draw step user, pas
        let bodyStep = $("#body-step");
        let buttonStep = $("#shop-regis-button");
        bodyStep.empty();
        buttonStep.empty();
        let bodyStep2 = "<div class='row'><div class='col-md-12'><label>Tên đăng nhập</label><div class='form-group'>";
        bodyStep2 += "<input name='UserName' id='UserName' type='text' placeholder='Nhập tên đăng nhập' required class='form-control' /></div></div>";
        bodyStep2 += "<div class='col-md-12'><label>Mật khẩu</label><div class='form-group'><input name='Password' id='Password' type='password'  class='form-control' /></div></div>";
        bodyStep.append(bodyStep2);
        buttonStep.append("<button id='shop-regis-step-3' onclick='Home.regisShopNormalStep3()' type='button' class='btn btn-success'>Đăng ký</button>");

    },
    regisShopNormalStep3: function () {
        //regis shop với thông tin default and user
        //check user đã tồn tại hay chưa?
        //nếu chưa thì cho phép đăng ký tài khoản
        let data = $('#frm-shop-normal').serialize();
        if ($("#txtEmail").val() != undefined) {
            data += "&EmailAddress=" + $("#txtEmail").val();
        }
        else if ($("#txtPhoneNumber").val() != undefined) {
            data += "&PhoneNumber=" + $("#txtPhoneNumber").val();
        }
        $.ajax({
            type: "POST",
            cache: false,
            url: this.url + 'RegisShopNormal',
            dataType: "json",
            data: data,
            success: function (res) {
                $('#banhang').modal('toggle');
                $.notify("Đăng ký gian hàng thành công.", "success");
            },
            error: function (err) {
                alert(err);
            }
        });

    },
    countDownOTP: function () {
        // Set the date we're counting down to
        var countDownDate = new Date("01/02/2022 14:55:00").getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("count-down").innerHTML = minutes + ":" + seconds;

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("count-down").innerHTML = "EXPIRED";
            }
        }, 1000);
    },
    Login: function () {
        let data = $('#frm-login').serialize();
        $.ajax({
            type: "POST",
            cache: false,
            url: this.url + 'Login',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res.result.code == 1) {
                    $.notify("Đăng nhập thành công.", "success");
                    $('#dangnhap').modal('toggle');
                    $('#frm-login input[type="text"]').val('');
                }
                else {
                    $('#frm-login input[type="text"]').val('');
                    $("#frm-error").html("Tên tài khoản hoặc password không đúng !");
                }

            },
            error: function (err) {
                alert(err);
            }
        });

    }
}

