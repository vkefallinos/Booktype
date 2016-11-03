import React, { Component } from 'react';

import Card from 'material-ui/Card'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {black500, blue500, red500, greenA200} from 'material-ui/styles/colors'

import ImageAdd from './ImageAdd';

import { EditorState, DefaultDraftBlockRenderMap,  } from 'draft-js';
import Editor, { composeDecorators, createEditorStateWithText } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
// import createInlineToolbarPlugin from 'react-draft-js-inline-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createDndPlugin from 'draft-js-dnd-plugin';
import createToolbarsPlugin, {
    BoldButton, ItalicButton, UnderlineButton, LinkButton,
    StyleButton, ImageButton, MoreButton,
    H1Button, H2Button, H3Button, H4Button, H5Button, H6Button,
    Button
} from 'draft-js-toolbars';
import 'draft-js-toolbars/example/css/toolbar_icons.css';
import 'draft-js-toolbars/example/css/popup_toolbar.css';
import 'draft-js-toolbars/example/css/inline_toolbar.css';
import 'draft-js-toolbars/example/css/side_toolbar.css';
import { Map, List } from 'immutable';

import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import styles from './style.css';

// const richButtonsPlugin = createRichButtonsPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const entityPropsPlugin = createEntityPropsPlugin();
const dndPlugin = createDndPlugin();
const toolbarsPlugin = createToolbarsPlugin();
const sideToolbarButtons = List([
  {
    button: MoreButton,
    buttons: List([
    ])
  },
  {
    button: ImageButton
  },
  {
    button: StyleButton,
    buttons: List([
      {button: H1Button},
      {button: H2Button},
      {button: H3Button},
      {button: H4Button},
      {button: H5Button},
      {button: H6Button}
    ])
  }
]);
const inlineToolbarButtons = List([
  {button: BoldButton},
  {button: ItalicButton},
  {button: UnderlineButton},
  {button: LinkButton}
]);
const { Toolbars } = toolbarsPlugin;
// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });


const plugins = [entityPropsPlugin,
    dndPlugin, focusPlugin, resizeablePlugin,
    imagePlugin, toolbarsPlugin];

// const {
//   // inline buttons
//   ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
//   // block buttons
//   ParagraphButton, BlockquoteButton, CodeButton, OLButton, ULButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
// } = richButtonsPlugin;


const ToolbarIconButton = ({iconType, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown }) =>
  <IconButton onClick={toggleInlineStyle} onMouseDown={onMouseDown} tooltip={label} >
    <FontIcon className="material-icons"
      color={isActive?red500:black500}
    >
      {iconType}
    </FontIcon>
  </IconButton>;

const ToolbarBlockButton = ({iconType, toggleBlockType, isActive, label, blockType }) =>
  <IconButton onClick={toggleBlockType} tooltip={label} >
    <FontIcon className="material-icons"
      color={isActive?red500:black500}
    >
      {iconType}
    </FontIcon>
  </IconButton>;



export default class MegaEditor extends Component {
  state = {
    editorState: createEditorStateWithText("Write something"),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };


  render() {
    const outerStyle = {
        position: 'relative',
        width: 600,
        margin: '150px auto',
        border: 'solid 1px grey'
    };
    return (

      <Card>
        {/* <Toolbar>
          <ToolbarGroup firstChild={true}>
            <BoldButton>
              <ToolbarIconButton iconType="format_bold"/>
            </BoldButton>
            <ItalicButton>
              <ToolbarIconButton iconType="format_italic"/>
            </ItalicButton>
            <UnderlineButton>
              <ToolbarIconButton iconType="format_underline"/>
            </UnderlineButton>
            <MonospaceButton/>
            <b> | &nbsp; </b>
            <H2Button>
              <ToolbarBlockButton iconType="title"/>
            </H2Button>
            <ULButton>
              <ToolbarBlockButton iconType="format_list_bulleted"/>
            </ULButton>
            <BlockquoteButton>
              <ToolbarBlockButton iconType="format_quote"/>
            </BlockquoteButton>
            <ParagraphButton/>
            <ImageAdd
              editorState={this.state.editorState}
              onChange={this.onChange}
              modifier={imagePlugin.addImage}
            />
          </ToolbarGroup>
        </Toolbar> */}
        <div style={outerStyle} className={styles.editor} onClick={this.focus}>
          <Toolbars
            inlineToolbarButtons={inlineToolbarButtons}
            sideToolbarButtons={sideToolbarButtons}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={plugins}
              ref={(element) => { this.editor = element; }}
            />
          </Toolbars>
        </div>
      </Card>
    );
  }
}
