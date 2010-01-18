function setup_submit_callbacks(wrap, result) {
    next_link = $(result).find("a#next");
    if (next_link.length) {
        location.href = next_link.attr('href');
        return;
    }
    wrap.getContent().find('.contentWrap').html(result).find('form:eq(0)').ajaxForm(
        function(result){setup_submit_callbacks(wrap, result);});
}

$(document).ready(function() {
    $("a[rel]").overlay({
        expose: '#499ad9',
        effect: 'apple',

        onBeforeLoad: function() {
            wrap = this;
            $.get(this.getTrigger().attr("href"),
                  function(result){setup_submit_callbacks(wrap, result);});
        }
    });
});

