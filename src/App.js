import React from 'react';
import './App.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.js';
import 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';


const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximized() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized ?
        ['editorWrap maximized',
        'previewWrap hide',
        'fa fa-compress'] :
        this.state.previewMaximized ?
        ['editorWrap hide',
        'previewWrap maximized',
        'fa fa-compress'] :
        ['editorWrap',
        'previewWrap',
        'fa fa-arrows-alt'];
    return (
        <div>
          <div className={classes[0]}>
            <Toolbar icon={classes[2]}
                     onClick={this.handleEditorMaximize}
                     text="Editor"/>
                     <Editor markdown={this.state.markdown}
                             onChange={this.handleChange} />
          </div>
          <div className="converter">
          </div>
          <div className={classes[1]}>
            <Toolbar icon={classes[2]}
                     onClick={this.handlePreviewMaximize}
                     text="Previewer"/>
                     <Preview markdown={this.state.markdown}/>
          </div>
        </div>
    )
  }
}

const Toolbar = (props) => {
  return (
      <div className="toolbar">
        <i title="no-stack-dub-sack" className="fa fa-free-code-camp"/>
        {props.text}
        <i onClick={props.onClick} className={props.icon}/>
      </div>
  )
};

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, {renderer: renderer })}}/>
        )
};

const Editor = (props) => {
    return(
        <textarea id="editor"
                  value={props.markdown}
                  onChange={props.onChange}
                  typeof="text"/>
    )
}

const placeholder =
    `This is my generic placeholder.
    do fun stuff like \`<div></div>div>\`, between 2 hacksticks.
    \`\`\`
    // multi-line code
    `;




export default App;
