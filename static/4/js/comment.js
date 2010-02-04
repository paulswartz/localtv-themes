function comment_load(response) {
    response = $(response);
    if (response.filter('#next').length) {
        location.href = response.filter('#next').attr('href');
    } else {
        response.find('script').remove();
        $("#overlay").find('.contentWrap').html(response);
        if ($("input[name=recaptcha_ip_field]").length) {
            recaptcha_url = $('script[src^=http://api.recaptcha.net/challenge]').attr('src');
            recaptcha_key = /k=(\w*)/.exec(recaptcha_url)[1];
            recaptcha_wrapper = document.createElement('div');
            Recaptcha.create(recaptcha_key, recaptcha_wrapper, RecaptchaOptions);
            $("#overlay input[name=recaptcha_ip_field]").after(recaptcha_wrapper)
        }
        wrap = $("#overlay").overlay({api: true,
                                         onClose: comment_close});
        wrap.getContent().find('form:eq(0)').submit(function() {
            if (typeof tinyMCE != 'undefined') {
                console.log('triggering save');
                tinyMCE.triggerSave();
            }}).ajaxForm({success: comment_load});
        wrap.load();
    }
}
function comment_close() {
    $("#overlay .contentWrap").empty();
    if ($("input[name=recaptcha_ip_field]").length) {
        recaptcha_url = $('script[src^=http://api.recaptcha.net/challenge]').attr('src');
        recaptcha_key = /k=(\w*)/.exec(recaptcha_url)[1];
        recaptcha_wrapper = document.createElement('div');
        Recaptcha.create(recaptcha_key, recaptcha_wrapper, RecaptchaOptions);
        $("input[name=recaptcha_ip_field]").after(recaptcha_wrapper)
    }
}
$(document).ready(function() {
    $(".comment_form form").submit(function() {
        if (typeof tinyMCE != 'undefined') {
            console.log('triggering save');
            tinyMCE.triggerSave();
        }}).ajaxForm({success: comment_load});
});