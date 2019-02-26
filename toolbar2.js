/* -----------------------------------------
Canvas Extensions Toolbar
------------------------------------------

*/
// get Current course ID
var query_string = window.location.href;
var query_string_split = query_string.split("/");
window.currentCourse = query_string_split.indexOf('courses') >= 0 ? query_string_split[query_string_split.indexOf('courses') + 1] : "";

window.canvasExtension = {};
window.canvasExtension.extensionMenu = {};

window.canvasExtension.dialog;
window.canvasExtension.dialogId = "#extensionsDialog";

window.canvasExtension.allItems = [];
window.canvasExtension.allItemsAjax = [];
window.canvasExtension.gradeBookColumns = [];


 /**
 * init, create the extension menu, each button runs a function or opens a dialog
 *
 */
window.canvasExtension.initCanvasExtensionMenu = function() {
  window.canvasExtension.buildDialog();
  //remove any existing extensions menu
  $('#extensionMenu').remove();
  //extension menu html
  var menuHTML = " \
    <div id='extensionMenu' class='' style='z-index: 10; background: #EEE; position: fixed; top: 0; right: 0; padding: 5px; text-align: right; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75); font-size: 0.5em; line-height: 1em; '> \
      <a title='Made By Justin Stewart - Stewarj@live.com' class='btn btn-primary' style='padding: 0.1em;'><i class='icon-question'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
      <a title='Undelete' onClick='window.canvasExtension.undelete()' class='btn btn-inverse' style='padding: 0.5em;'><i class='icon-reset'></i></a> \
      <a title='Rubrics' onClick='window.canvasExtension.rubrics()' class='btn btn-inverse' style='padding: 0.5em;'><i class='icon-rubric'></i></a>&nbsp;&nbsp;&nbsp; \
      <a title='Expand all' onClick='window.canvasExtension.expandAll()' class='btn btn-info' style='padding: 0.5em;'><i class='icon-page-down'></i></a> \
      <a title='Contract all' onClick='window.canvasExtension.contractAll()' class='btn btn-info' style='padding: 0.5em;'><i class='icon-page-up'></i></a> \
      <a title='Publish all' onClick='window.canvasExtension.publishAll()' class='btn btn-success' style='padding: 0.5em;'><i class='icon-publish'></i></a> \
      <a title='Unpublish all' onClick='window.canvasExtension.unpublishAll()' class='btn' style='padding: 0.5em;'><i class='icon-unpublish'></i></a>&nbsp;&nbsp;&nbsp;&nbsp; \
      <a title='Unenrol from courses' onClick='window.canvasExtension.removeuser()' class='btn btn-danger' style='padding: 0.5em;'><i class='icon-mini-arrow-down'></i></a> \
      <a title='Remove spaces' onClick='window.canvasExtension.removespaces()' class='btn btn-upload' style='padding: 0.5em;'><i class='icon-upload'></i></a> \
      <a title='add return buttons' onClick='window.canvasExtension.addreturnbutton()' class='btn btn-danger' style='padding: 0.5em;'><i class='icon-updown'></i></a> \
      <a title='Formatomatic ;)' onClick='window.canvasExtension.doitall()' class='btn btn-success' style='padding: 0.8em;'><i class='icon-like'></i></a> \
      <a title='Remove formatting' onClick='window.canvasExtension.removeFormatting()' class='btn btn-default' style='padding: 0.5em;'><i class='icon-clear-text-formatting'></i></a> \
      <a title='Remove tables' onClick='window.canvasExtension.removeTables()' class='btn btn-default' style='padding: 0.5em;'><i class='icon-table'></i></a> \
      <a title='Make Edits' onClick='window.canvasExtension.makeEdits()' class='btn btn-default' style='padding: 0.5em;'><i class='icon-mini-arrow-down'></i></a> \
      <a title='Remove Phantom Links' onClick='window.canvasExtension.removephantom()' class='btn btn-default' style='padding: 0.5em;'><i class='icon-link'></i></a> \
            </div> \
    ";
  //add extension menu to page
  window.extensionMenu = $('body').append(menuHTML);
}

 /**
 * setup the dialog window, add it to the page
 *
 */
window.canvasExtension.buildDialog = function() {
  //destroy any existing dialogs
  //if element exists, remove
  if ($(window.canvasExtension.dialog) > 0) window.canvaExtension.dialog.dialog("destroy");
  $(window.canvasExtension.dialogId).remove();
  //add  dialog
  $('body').append('<div id="' + window.canvasExtension.dialogId.substring(1) + '" title=""></div>');
  window.canvasExtension.dialog = $(window.canvasExtension.dialogId);
  var dialogHtml = "";
  window.canvasExtension.dialog.append(dialogHtml);
}


// Contract all modules/assignments
window.canvasExtension.contractAll = function() {
  $('.ig-header-title.collapse_module_link:visible, .element_toggler[aria-expanded="true"]:visible').click();
  $('.item-group-container .item-group-condensed, .ig-header').attr('style', 'padding: 0;').addClass('contractedExpanderGroups');
  $('.item-group-container .ig-header button').attr('style', 'padding: 0 5px').addClass('contractedExpanderGroups');

  //$('.ig-header-title, .expand_module_link').attr('style', 'margin: 0;');
}

// Expand all modules/assignments
window.canvasExtension.expandAll = function() {
  $('.ig-header-title.expand_module_link:visible, .element_toggler[aria-expanded="false"]:visible').click();
  $('.contractedExpanderGroups').attr('style', '').removeClass('contractedExpanderGroups');
  $('.edit_question_link').click();
  $('.icon-edit standalone-icon').click();
  $('.edit_html').click();
}

// Removes all <table> tags from the Rich Content Editor on the current page
window.canvasExtension.removeTables = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content.replace(/<\/?table[^>]*>/g,'');
  
  editor.setContent(content);
  });

}

// publish all items on page
window.canvasExtension.publishAll = function() {
  //publish pages
  $('#context_modules_sortable_container .context_module_item .ig-admin span[role="button"] > i').each(function() {
    if ($(this).hasClass("icon-unpublish")) {
      $(this).parent().trigger("click");
    }
  });
  //publish modules
  $('#context_modules_sortable_container div.ig-header > .ig-header-admin span[role="button"] > i').each(function() {
    if ($(this).hasClass("icon-unpublish")) {
      $(this).parent().trigger("click");
    }
  });
}

// Unpublish all items on page
window.canvasExtension.unpublishAll = function() {
  //unpublish pages
  $('#context_modules_sortable_container .context_module_item .ig-admin span[role="button"] > i').each(function() {
    if ($(this).hasClass("icon-publish")) {
      $(this).parent().trigger("click");
    }
  });
  //unpublish modules
  $('#context_modules_sortable_container div.ig-header > .ig-header-admin span[role="button"] > i').each(function() {
    if ($(this).hasClass("icon-publish")) {
      $(this).parent().trigger("click");
    }
  });
}


// Navigates to the undelete page for the current course.
window.canvasExtension.undelete = function() {
  window.location.href = '/courses/' + window.currentCourse + '/undelete';
}

// Navigates to the rubrics page for the current course.
window.canvasExtension.rubrics = function() {
  window.location.href = '/courses/' + window.currentCourse + '/rubrics';
}

/**
  * Removes all leading, trailing and extra white spaces and paragraphs 
  * from the Rich Text Editor currently on the screen, as well as the title.
  * Also removes unwanted HTML tags and inline CSS.
  * Notes: Must be in Edit mode to work. Will not remove spaces in between
  * letters in a word.
  */

window.canvasExtension.removeFormatting = function() {
    $(document).ready(function() {
    const pageType = window.location.pathname;

    const fixEditorContent = () => {
        const editor = tinymce.activeEditor;
        let content = editor.getContent();
        content = content.replace(/<p>&nbsp;<\/p>/g, '').replace(/&nbsp;/g, ' ').replace(/&emsp;/g, '').replace(/&ensp;/g, '').replace(/&bull;/g, '')
        .replace(/\( +/g, '(').replace(/ +\)/g, ')').replace(/ +\./g, '.').replace(/ +\,/g, ',').replace(/ +\!/g, '!')
        .replace(/ +\?/g, '?').replace(/ +\:/g, ':').trim()


        //these replace calls remove unwanted HTML tags
        .replace(/<\/?span[^>]*>/g, '').replace(/<\/?div[^>]*>/g, '').replace(/<\/em>/g, '</strong>').replace(/<em>/g, '<strong>')
        .replace(/<\/?pre[^>]*>/g, '').replace(/<\/?br[^>]*>/g, '<p>')
        
        
        //finally, this call removes all inline CSS styles from all HTML tags
        .replace(/style=\"(.*?)\"/g, '')
        
        ;
        editor.setContent(content);
    }

    const fixPageTitle = () => {
        let pageTitle = $('#title').val().replace(/\s+/g, ' ').replace( / +\:/g, ':' ).replace( / +\,/g, ',' ).trim();
        $('#title').val(pageTitle);
    }
    
    const fixAssignmentTitle = () => {
        let assignmentName = $('#assignment_name').val().replace(/\s+/g, ' ').replace(/ +\:/g, ':').replace(/ +\,/g, ',').trim();
        $('#assignment_name').val(assignmentName);
    }

    const fixQuizTitle = () => {
        let quizTitle = $('#quiz_title').val().replace(/\s+/g, ' ').replace(/ +\:/g, ':').replace(/ +\,/g, ',').trim();
        $('#quiz_title').val(quizTitle);
    }

    const fixDiscussionTitle = () => {
        let discussionTitle = $('#discussion-title').val().replace(/\s+/g, ' ').replace(/ +\:/g, ':')
        .replace( /\( +/g, '(' ).replace( / +\)/g, ')' ).replace(/ +\./g, '.').replace(/ +\,/g, ',').trim();
        $('#discussion-title').val(discussionTitle);
    }
     
      if(pageType.indexOf("pages") >= 0) {
       fixPageTitle();
     } else if(pageType.indexOf("assignments") >= 0) {
       fixAssignmentTitle();
     } else if(pageType.indexOf("quizzes") >= 0) {
       fixQuizTitle();
     } else if(pageType.indexOf("discussion_topics") >= 0) {
       fixDiscussionTitle();
     }
       fixEditorContent();
     });
}

// Removes all <table> tags from the Rich Content Editor on the current page
window.canvasExtension.removeTables = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content.replace(/<\/?table[^>]*>/g,'');
  
  editor.setContent(content);
  });
}

// function keys script

window.canvasExtension.makeEdits = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content.replace('Blackboard','<span style="background-color: #ffcc99;">Canvas</span>')
  .replace(/.blackboard/g,' <span style="background-color: #ffcc99;">Canvas</span>')
  .replace(/.Blackboard/g,' <span style="background-color: #ffcc99;">Canvas</span>')
  .replace(/<\/?img title[^>]*>/g, '<figure>insert image here<figcaption><sup>insert image caption here *superscript</sup></figcaption></figure>')






  .replace('Page 1</p>','')
  .replace('Page 2</p>','')
  .replace('Page 3</p>','')
  .replace('Page 4</p>','')
  .replace('Page 5</p>','')
  .replace('Page 6</p>','')
  .replace('Page 7</p>','')
  .replace('Page 8</p>','')
  .replace('Page 9</p>','')
  .replace('Page 10</p>','')
  .replace('Page 11</p>','')
  .replace('Page 12</p>','')
  .replace('Page 13</p>','')
  .replace('Page 14</p>','')
  .replace('Page 15</p>','')
  .replace('Page 16</p>','')
  .replace('Page 17</p>','')
  .replace('Page 18</p>','')
  .replace('Page 19</p>','')
  .replace('Page 20</p>','')
  .replace('Page 21</p>','')
  .replace('Page 22</p>','')
  .replace('Page 23</p>','')
  .replace('Page 24</p>','')
  .replace('Page 25</p>','')
  .replace('Page 26</p>','')
  .replace('Page 27</p>','')
  .replace('Page 28</p>','')
  .replace('Page 29</p>','')
  .replace('Page 30</p>','')
  .replace('Page 31</p>','')
  .replace('Page 32</p>','')
  .replace('Page 33</p>','')
  .replace('Page 34</p>','')
  .replace('Page 35</p>','')
  .replace('Page 36</p>','')
  .replace('Page 37</p>','')
  .replace('Page 38</p>','')
  .replace('Page 39</p>','')
  .replace('Page 40</p>','')
  .replace('Page 41</p>','')
  .replace('Page 42</p>','')
  .replace('Page 43</p>','')
  .replace('Page 44</p>','')
  .replace('Page 45</p>','')
  .replace('Page 46</p>','')
  .replace('Page 47</p>','')
  .replace('Page 48</p>','')
  .replace('Page 49</p>','')
  .replace('Page 50</p>','')
  .replace('Page 51</p>','')
  .replace('Page 52</p>','')
  .replace('Page 53</p>','')
  .replace('Page 54</p>','')
  .replace('Page 55</p>','')
  .replace('Page 56</p>','')
  .replace('Page 57</p>','')
  .replace('Page 58</p>','')
  .replace('Page 59</p>','')
  .replace('Page 60</p>','')
  .replace('Page 61</p>','')
  .replace('Page 62</p>','')
  .replace('Page 63</p>','')
  .replace('Page 64</p>','')
  .replace('Page 65</p>','')

  .replace(/<h1>/g,'<h2>')


    .replace('<p><a name="#1"></a></p>','')
  .replace('<p><a name="#2"></a></p>','')
  .replace('<p><a name="#3"></a></p>','')
  .replace('<p><a name="#4"></a></p>','')
  .replace('<p><a name="#5"></a></p>','')
  .replace('<p><a name="#6"></a></p>','')
  .replace('<p><a name="#7"></a></p>','')
  .replace('<p><a name="#8"></a></p>','')
  .replace('<p><a name="#9"></a></p>','')
  .replace('<p><a name="#10"></a></p>','')
  .replace('<p><a name="#11"></a></p>','')
  .replace('<p><a name="#12"></a></p>','')
  .replace('<p><a name="#13"></a></p>','')
  .replace('<p><a name="#14"></a></p>','')
  .replace('<p><a name="#15"></a></p>','')
  .replace('<p><a name="#16"></a></p>','')
  .replace('<p><a name="#17"></a></p>','')
  .replace('<p><a name="#18"></a></p>','')
  .replace('<p><a name="#19"></a></p>','')
  .replace('<p><a name="#20"></a></p>','')
  .replace('<p><a name="#21"></a></p>','')
  .replace('<p><a name="#22"></a></p>','')
  .replace('<p><a name="#23"></a></p>','')
  .replace('<p><a name="#24"></a></p>','')
  .replace('<p><a name="#25"></a></p>','')
  .replace('<p><a name="#26"></a></p>','')
  .replace('<p><a name="#27"></a></p>','')
  .replace('<p><a name="#28"></a></p>','')
  .replace('<p><a name="#30"></a></p>','')
  .replace('<p><a name="#31"></a></p>','')
  .replace('<p><a name="#32"></a></p>','')
  .replace('<p><a name="#33"></a></p>','')
  .replace('<p><a name="#34"></a></p>','')
  .replace('<p><a name="#35"></a></p>','')
  .replace('<p><a name="#36"></a></p>','')
  .replace('<p><a name="#37"></a></p>','')
  .replace('<p><a name="#38"></a></p>','')
  .replace('<p><a name="#39"></a></p>','')
  .replace('<p><a name="#40"></a></p>','')
  .replace('<p><a name="#41"></a></p>','')
  .replace('<p><a name="#42"></a></p>','')
  .replace('<p><a name="#43"></a></p>','')
  .replace('<p><a name="#44"></a></p>','')
  .replace('<p><a name="#45"></a></p>','')
  .replace('<p><a name="#46"></a></p>','')
  .replace('<p><a name="#47"></a></p>','')
  .replace('<p><a name="#48"></a></p>','')
  .replace('<p><a name="#49"></a></p>','')
  .replace('<p><a name="#50"></a></p>','')
  .replace('<p><a name="#51"></a></p>','')
  .replace('<p><a name="#52"></a></p>','')
  .replace('<p><a name="#53"></a></p>','')
  .replace('<p><a name="#54"></a></p>','')
  .replace('<p><a name="#55"></a></p>','')
  .replace('<p><a name="#56"></a></p>','')
  .replace('<p><a name="#57"></a></p>','')
  .replace('<p><a name="#58"></a></p>','')
  .replace('<p><a name="#59"></a></p>','')
  .replace('<p><a name="#60"></a></p>','')
  .replace('<p><a name="#61"></a></p>','')
  .replace('<p><a name="#62"></a></p>','')
  .replace('<p><a name="#63"></a></p>','')
  .replace('<p><a name="#64"></a></p>','')
  .replace('<p><a name="#65"></a></p>','')





  

  .replace(/\.docx/g,' [DOCX, XX]')
  .replace(/\.doc/g,' [DOC, XX]')
  .replace(/\.pdf/g,' [PDF, XX]')
  .replace(/\.xls/g,' [XML, XX]')
  .replace(/\.zip/g,' [ZIP, XX]')
  .replace(/\.pptx/g,' [PPTX, XX]')
  .replace(/\.ppt/g,' [PPT, XX]')
  .replace(/\.xlsx/g,' [XLSX, XX]')
  .replace(/\.txt/g,' [TXT, XX]')
  .replace(/\.gif/g,' [GIF, XX]')
  .replace(/\.wav/g,' [WAV, XX]')
  .replace(/\.aif/g,' [AIF, XX]')
  .replace(/\.mp3/g,' [MP3, XX]')
  .replace(/\.mp4/g,' [MP4, XX]')
  .replace(/\.7z/g,' [7Z, XX]')
  .replace(/\.rar/g,' [RAR, XX]')
  .replace(/\.csv/g,' [CSV, XX]')
  .replace(/\.exe/g,' [EXE, XX]')
  .replace(/\.odt/g,' [ODT, XX]')
  .replace(/\.dotx/g,' [DOTX, XX]')
  .replace(/\.dot/g,' [DOT, XX]')
  .replace(/\.pot/g,' [POT, XX]')
  .replace(/\.potx/g,' [POTX, XX]')






  ;
  
  editor.setContent(content);
  });
}

window.canvasExtension.removephantom = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content.replace('></a></h2>','>x</a></h2>')



  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')
  .replace('></a></h2>','>x</a></h2>')



  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')
  .replace('<h2></h2>','')



  .replace('<p><a name="#1"></a></p>','')
  .replace('<p><a name="#2"></a></p>','')
  .replace('<p><a name="#3"></a></p>','')
  .replace('<p><a name="#4"></a></p>','')
  .replace('<p><a name="#5"></a></p>','')
  .replace('<p><a name="#6"></a></p>','')
  .replace('<p><a name="#7"></a></p>','')
  .replace('<p><a name="#8"></a></p>','')
  .replace('<p><a name="#9"></a></p>','')
  .replace('<p><a name="#10"></a></p>','')
  .replace('<p><a name="#11"></a></p>','')
  .replace('<p><a name="#12"></a></p>','')
  .replace('<p><a name="#13"></a></p>','')
  .replace('<p><a name="#14"></a></p>','')
  .replace('<p><a name="#15"></a></p>','')
  .replace('<p><a name="#16"></a></p>','')
  .replace('<p><a name="#17"></a></p>','')
  .replace('<p><a name="#18"></a></p>','')
  .replace('<p><a name="#19"></a></p>','')
  .replace('<p><a name="#20"></a></p>','')
  .replace('<p><a name="#21"></a></p>','')
  .replace('<p><a name="#22"></a></p>','')
  .replace('<p><a name="#23"></a></p>','')
  .replace('<p><a name="#24"></a></p>','')
  .replace('<p><a name="#25"></a></p>','')
  .replace('<p><a name="#26"></a></p>','')
  .replace('<p><a name="#27"></a></p>','')
  .replace('<p><a name="#28"></a></p>','')
  .replace('<p><a name="#30"></a></p>','')
  .replace('<p><a name="#31"></a></p>','')
  .replace('<p><a name="#32"></a></p>','')
  .replace('<p><a name="#33"></a></p>','')
  .replace('<p><a name="#34"></a></p>','')
  .replace('<p><a name="#35"></a></p>','')
  .replace('<p><a name="#36"></a></p>','')
  .replace('<p><a name="#37"></a></p>','')
  .replace('<p><a name="#38"></a></p>','')
  .replace('<p><a name="#39"></a></p>','')
  .replace('<p><a name="#40"></a></p>','')
  .replace('<p><a name="#41"></a></p>','')
  .replace('<p><a name="#42"></a></p>','')
  .replace('<p><a name="#43"></a></p>','')
  .replace('<p><a name="#44"></a></p>','')
  .replace('<p><a name="#45"></a></p>','')
  .replace('<p><a name="#46"></a></p>','')
  .replace('<p><a name="#47"></a></p>','')
  .replace('<p><a name="#48"></a></p>','')
  .replace('<p><a name="#49"></a></p>','')
  .replace('<p><a name="#50"></a></p>','')
  .replace('<p><a name="#51"></a></p>','')
  .replace('<p><a name="#52"></a></p>','')
  .replace('<p><a name="#53"></a></p>','')
  .replace('<p><a name="#54"></a></p>','')
  .replace('<p><a name="#55"></a></p>','')
  .replace('<p><a name="#56"></a></p>','')
  .replace('<p><a name="#57"></a></p>','')
  .replace('<p><a name="#58"></a></p>','')
  .replace('<p><a name="#59"></a></p>','')
  .replace('<p><a name="#60"></a></p>','')
  .replace('<p><a name="#61"></a></p>','')
  .replace('<p><a name="#62"></a></p>','')
  .replace('<p><a name="#63"></a></p>','')
  .replace('<p><a name="#64"></a></p>','')
  .replace('<p><a name="#65"></a></p>','')

  

.replace(/<h2><a href="http:\/\/astronomy\.swin\.edu\.au\/cms\/sao\/node\//g,'')
  .replace(/<h2><a href="https:\/\/astronomy\.swin\.edu\.au\/cms\/sao\/node\//g,'')
  .replace(/['0-9999']['0-9999']['0-9999']['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']['0-9999']['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/<h2><a><\/a><\/h2>/g,'')
  .replace(/<h2><a>x<\/a><\/h2>/g,'')









    ;
  editor.setContent(content);
  });
  
}

window.canvasExtension.removesao = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content  .replace(/<h2><a href="http:\/\/astronomy\.swin\.edu\.au\/cms\/sao\/node\//g,'')
  .replace(/<h2><a href="https:\/\/astronomy\.swin\.edu\.au\/cms\/sao\/node\//g,'')
  .replace(/['0-9999']['0-9999']['0-9999']['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']['0-9999']['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']['0-9999']">x<\/a><\/h2>/g,'')
  .replace(/['0-9999']">x<\/a><\/h2>/g,'')

  
  editor.setContent(content);
  });
}



window.canvasExtension.addreturnbutton = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content.replace(/<hr \/>/g,'<p><a class="btn btn-success" title="Front Page" href="#index" data-api-returntype="Page">Return To Index</a></p><hr />');
  
  editor.setContent(content);
  });
}


window.canvasExtension.fixindex = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content.replace(/<p><a href="#index">Return to index<\/a><\/p>/g,'<p><a class="btn btn-success" title="Front Page" href="#index" data-api-returntype="Page">Return To Index</a></p>');
  
  editor.setContent(content);
  });
}

window.canvasExtension.removespaces = function() {
  $(document).ready(function() {
  const editor = tinymce.activeEditor;
  let content = editor.getContent();
  
  content = content.replace(/<p>&nbsp;<\/p>/g,'');
  
  editor.setContent(content);
  });
}

// removeuser
window.canvasExtension.removeuser = function() {
  $('.courses .unenroll_link').click();
  }


window.canvasExtension.doitall = function() {
window.setTimeout(window.canvasExtension.removeFormatting, 100);
window.setTimeout(window.canvasExtension.removeTables, 300);
window.setTimeout(window.canvasExtension.makeEdits, 500);
window.setTimeout(window.canvasExtension.removephantom, 700);
 }

// removeuser
window.canvasExtension.removeuser = function() {
  $('.courses .unenroll_link').click();
  }


// Accept enrol button
window.canvasExtension.testButton = function() {
window.setTimeout(window.canvasExtension.accept, 100);
window.setTimeout(window.canvasExtension.settings, 500);
window.setTimeout(window.canvasExtension.restrictsetting, 5000);
}
  

// Accept course invite

window.canvasExtension.accept = function() {
  $('.Button--success').click();
}

// navigate to settings


window.canvasExtension.settings = function() {
  window.location.href = '/courses/' + window.currentCourse + '/settings'
}


// tick restrict user enrolments button
window.canvasExtension.restrictsetting = function() {
document.getElementById("course_restrict_enrollments_to_course_dates").checked = "checked";
window.setTimeout(window.canvasExtension.updatesettings, 500);
}


//------------------ WIP::COURSES -----------------

window.canvasExtension.allCourses = [];

// list all courses in an account
window.canvasExtension.listAllCourses = function() {
  window.canvasExtension.allCourses = [];
  var nextPage = 1;
  window.canvasExtension.listNextCourses(nextPage);
}

window.canvasExtension.listNextCourses = function(pNum) {
  $.ajax({
    type: "GET",
    url: "/api/v1/accounts/1/courses?page=" + pNum + "&per_page=100",
    dataType: "json",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function(data, textStatus, xhr) {
      //console.log(xhr.getResponseHeader('Link'));
      $.each(data, function(i, tCourse) {
        window.canvasExtension.allCourses.push({
          "name": tCourse.name,
          "id": tCourse.id
        });
        //$(window.canvasExtension.dialogId+" #courseList tbody").append('<tr><td>'+tCourse.id+'</td><td>'+tCourse.name+'</td></tr>');
      });
      //will throw out of loop if number of courses > 10000 -- if you have more than 10000 units, increase the pNum check
      if (xhr.getResponseHeader('Link').indexOf('rel="next"') > 0 && pNum < 100) {
        pNum++;
        window.canvasExtension.listNextCourses(pNum);
      } else {
        window.canvasExtension.addCourseResults();
      }
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log("error: " + errorThrown);
    }
  });
}

window.canvasExtension.addCourseResults = function() {
  $('a.button').click(function(){
    if(condition == 'true'){
        $.when(function1()).then(function2());
    }
    else {
        doThis(someVariable);
    }
});
}

window.canvasExtension.updatesettings = function() {
  $('.btn-primary').click()
}

//---------------WIP::CALENDAR EVENTS--------------
/**
  * Remove all Calendar events
  */
window.canvasExtension.removeCalendarEvents = function() {
  //get all calendar events
  $.ajax({
    type: "GET",
    url: "/api/v1/calendar_events",
    crossDomain: true,
    cache: false,
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: function(data, textStatus, xhr) {
      console.log(textStatus, xhr.status, data);
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log("error: " + errorThrown);
    }
  })
}

//---- RUN THE INIT ------------------------------
window.canvasExtension.initCanvasExtensionMenu();



function checkKeyPress(key){
if (key.keycode == "65") {
  
alert("the a letter has been pressed")
}

}