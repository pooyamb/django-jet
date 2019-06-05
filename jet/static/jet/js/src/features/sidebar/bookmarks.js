import $, { ajax } from 'jquery';
import t from '../../utils/translate';
import alertify from 'alertifyjs';


class SideBarBookmarks {
    constructor($sidebar) {
        this.$sidebar = $sidebar;
    }
}

SideBarBookmarks.prototype = {
    addBookmark: function($form, $container) {
        ajax({
            url: $form.attr('action'),
            method: $form.attr('method'),
            dataType: 'json',
            data: $form.serialize(),
            success: function (result) {
                if (result.error) {
                    return;
                }

                var $item = $container
                    .find('.bookmark-item.clone')
                    .clone()
                    .removeClass('clone');

                $item
                    .attr('href', result.url)
                    .find('.sidebar-link-label')
                    .append(result.title);
                $item
                    .find('.bookmarks-remove')
                    .data('bookmark-id', result.id);

                $container.append($item);
            }
        });
    },
    deleteBookmark: function($form, $item) {
        ajax({
            url: $form.attr('action'),
            method: $form.attr('method'),
            dataType: 'json',
            data: $form.serialize(),
            success: function (result) {
                if (result.error) {
                    return;
                }

                $item.remove();
            }
        });
    },
    initBookmarksAdding: function($sidebar) {
        var self = this;
        var $dialog = $sidebar.find('#bookmarks-add-dialog');
        var $form = $dialog.find('form');
        var $titleInput = $form.find('input[name="title"]');
        var $urlInput = $form.find('input[name="url"]');
        var $container = $sidebar.find('.bookmarks-list');

        $sidebar.find('.bookmarks-add').on('click', function(e) {
            e.preventDefault();

            var $link = $(this);
            var defaultTitle = $link.data('title') ? $link.data('title') : document.title;
            var url = window.location.href;

            $titleInput.attr('value', defaultTitle);
            $urlInput.attr('value', url);

            var buttons = {};
            
            alertify.confirm($dialog.html()).set('onok', function(closeevent, value) {
                $titleInput.val($(this.elements.root).find('form input[name=title]').val())
                $urlInput.val($(this.elements.root).find('form input[name=url]').val())
                self.addBookmark($form, $container);
                alertify.success('Boomark created!');
            }).set('title',t('Add bookmark')).set({labels:{ok:t('Add'), cancel: t('Cancel')}, transition: 'fade'});;
        });
    },
    initBookmarksRemoving: function($sidebar) {
        var self = this;
        var $form = $sidebar.find('#bookmarks-remove-form');
        var $idInput = $form.find('input[name="id"]');
        var $dialog = $sidebar.find('#bookmarks-remove-dialog');

        $sidebar.on('click', '.bookmarks-remove', function(e) {
            e.preventDefault();

            var $remove = $(this);
            var $item = $remove.closest('.bookmark-item');
            var bookmarkId = $remove.data('bookmark-id');

            $idInput.val(bookmarkId);

            var buttons = {};
            
            alertify.confirm('Delete bookmark', "Are you sure want to delete this bookmark?",
                function(){
                    self.deleteBookmark($form, $item);
                    alertify.error('Boomark deleted!');
                },
                function(){
            }).set({labels:{ok:t('Delete'), cancel: t('Cancel')}, transition: 'fade'});
        });
    },
    initBookmarks: function($sidebar) {
        this.initBookmarksAdding($sidebar);
        this.initBookmarksRemoving($sidebar);
    },
    run: function() {
        try {
            this.initBookmarksAdding(this.$sidebar);
            this.initBookmarksRemoving(this.$sidebar);
        } catch (e) {
            console.error(e, e.stack);
        }
    }
};

export default SideBarBookmarks;
