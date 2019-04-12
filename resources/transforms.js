const preStyle = 'style="font-size:0.8em;line-height:1.2em;"';
const preStyleError = 'style="font-size:0.8em;line-height:1.2em;color:#9e0000;font-weight:bold;"';

const runJsCode = (code, onError) => {
  try {
    (new Function(code))()
  } catch(error) {
    onError(error);
  }
};


function babelToConsole(code) {
  const babelOptions = {
    presets: [ "react", ["es2015", { "modules": false }]]
  }


  let onError = error => {
   console.log(error.toString() + error.stack);  
  }

  try {
    const transpiled = Babel.transform(code, babelOptions).code;
    const originalLog = console.log;
    const consoleOutput = [];
    
    console.log = what => consoleOutput.push(what);
    runJsCode(transpiled, onError);
    console.log = originalLog;

    return consoleOutput.map(what => `<p>${ what }</p>`).join('');
  } catch (error) {
    return `<pre ${ preStyleError }>${ error.toString() + error.stack }</pre>`;
  }
}
