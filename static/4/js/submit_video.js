function setup_submit_callbacks(wrap, result) {
    next_link = $(result).find("a#next");
    if (next_link.length) {
        location.href = next_link.attr('href');
        return;
    }
    content = wrap.getContent().find('.contentWrap');
    content.html(result).find('form').ajaxForm(
        function(result){setup_submit_callbacks(wrap, result);});
}
