$(document).ready(function() {
    $(".comment_form form").ajaxForm({success: function (response) {
        response = $(response);
        if (response.children('#next').length) {
            location.href = response.children('#next').attr('href');
        } else {
            $("#overlay").find('.contentWrap').html(response);
            wrap = $("#overlay").overlay({api: true});
            wrap.getContent().find('form:eq(0)').ajaxForm(
                function(result) {setup_submit_callbacks(wrap, result);});
            wrap.load();
        }
    }});
});