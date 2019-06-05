export default function(str) {
    if (window.django == undefined) {
        return str;
    }
    return django.gettext(str);
};
