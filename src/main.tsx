import { render } from 'preact'
import { App } from './app.tsx'

history.scrollRestoration = 'manual'

render(<App />, document.getElementById('app')!)
