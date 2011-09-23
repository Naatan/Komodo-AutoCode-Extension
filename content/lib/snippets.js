/**
 * @contributor		Dave Stewart (http://davestewart.co.uk/)
 * @version			0.3
 */
autocode.snippets =
{
	// ----------------------------------------------------------------------------------------------------
	// Events
	// ----------------------------------------------------------------------------------------------------

	// ----------------------------------------------------------------------------------------------------
	// Events
	// ----------------------------------------------------------------------------------------------------

		events:
		{
			
			add:function(type, scope, handler)
			{
				this.remove();
				ko.views.manager.topView.addEventListener('keypress', this.onKeyPress, true);
			},

			remove:function(type, scope, handler)
			{
				if (autocode && autocode.onKeyPress)
				{
					ko.views.manager.topView.removeEventListener('keypress', this.onKeyPress, true);
				}
			},

			onKeyPress:function(event)
			{
				// Only trap when ENTER pressed with no modifiers
				if (event.keyCode === 9 &&  ( ! event.ctrlKey && ! event.altKey && ! event.shiftKey ) )
				{
					if(autocode.snippets.processInput())
					{
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}
		},

	// ----------------------------------------------------------------------------------------------------
	// Input
	// ----------------------------------------------------------------------------------------------------

		processInput:function(a, bcdefgasasasasds)
		{
			// variables
				var view				= ko.views.manager.currentView;

				/** @type {Components.interfaces.ISciMoz} */
				var scimoz				= view.scimoz;

			// Don't do anything if there is a selection within the document
				if (scimoz.anchor != scimoz.currentPos)
				{
					return false;
				}
				
			// Exit if the autocomplete box is already showing
				if(scimoz.autoCActive())
				{
					//scimoz.autoCCancel();
					return false;
				}

			// get the current line
				var lineIndex			= scimoz.lineFromPosition(scimoz.currentPos);
				var lineStart			= scimoz.positionFromLine(lineIndex);
				var lineEnd				= scimoz.getLineEndPosition(lineIndex);
				var line				= scimoz.getTextRange(lineStart, lineEnd);

			// don't add abbreviation if there are any other words on the line
				//if(/^\s*(\*|\/\/)/.test(line))
				if( ! /^\s*\w+$/.test(line))
				{
					return false;
				}

			// grab word
				var word				= ko.interpolate.getWordUnderCursor(scimoz);

			// test for opening block comment
				if (word.match(/\w+/))
				{
					var snippet = ko.abbrev.findAbbrevSnippet(word);
					if (snippet)
					{
						scimoz.beginUndoAction();
						scimoz.selectionStart = scimoz.currentPos - word.length;
						ko.projects.snippetInsert(snippet);
						scimoz.endUndoAction();
						return true;
					}
				}

			// return false
				return false;
		},

		/*
				class
		
		*/


};

//autocode.snippets.processInput()