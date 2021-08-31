<script>
    import {fetchWithAuth} from "../utils/fetch"
    import {session} from "../utils/session"

    import {get} from 'svelte/store'

    
    let files = [];
    const getFiles = async ()=>{
        const data = await fetchWithAuth({
          query: `
            {
                 filessharedwithme{
                    _id,
                    location,
                    filename,
                    type,
                    owner
                }
            }
            `,
            variables: {
            
            },
        });
        files = data.data.filessharedwithme;
        console.log(data.data.files)
    }

    getFiles();


</script>
<div class="columns" style="flex-wrap: wrap;">

{#each files as { _id,location,filename,type }, i}
<div class="column is-one-quarter"><img style="max-width:100%" alt="{filename}" src="http://127.0.0.1:3000/upload/{location}"/></div>

{/each}
</div>
