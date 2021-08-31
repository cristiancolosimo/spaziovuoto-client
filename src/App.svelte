<script>
	
  import { Router, Route, Link } from "svelte-navigator";
  import NavBar from './components/navbar.svelte'

  import Login from './routes/login.svelte'	
  import Files from './routes/files.svelte'	
  import Shared from './routes/sharedwithme.svelte'	

  import {session} from './utils/session';	
  
  let auth = false;

  session.subscribe(val => auth = val.authenticated);

</script>
<Router>
<main>
	
	{#if !auth }
	<Route path="/" >
		<Login/>
	</Route>
	{/if}

	{#if auth }
	<NavBar/>

	<Route path="files">
		<Files/>
	</Route>
	<Route path="shared">
		<Shared/>
	</Route>
	{/if}

</main>
</Router>

