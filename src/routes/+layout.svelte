<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<title>Web Traffic</title>
</svelte:head>

<Header />
<slot />
<Footer />
