<script>
    import {fetchWithAuth} from "../utils/fetch"
    import {session} from "../utils/session"

    import {get} from 'svelte/store'

    
    let files = [];
    let uploadfile = [];
    let uploadPreview;

    let formdata;
    const getFiles = async ()=>{
        const data = await fetchWithAuth({
          query: `
            {
                 files{
                    _id,
                    location,
                    filename,
                    type
                }
            }
            `,
            variables: {
            
            },
        });
        files = data.data.files;
        console.log(data.data.files)
    }

    getFiles();



    
const changefile = ()=>{
    function readAndPreview(file) {

// Make sure `file.name` matches our extensions criteria
if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    var image = new Image();
    image.style.width = "300px";
    image.title = file.name;
    image.src = this.result;
    uploadPreview.appendChild( image );
  }, false);

  reader.readAsDataURL(file);
}}



if (uploadfile) {
    uploadPreview.innerHTML = "";
    [].forEach.call(uploadfile, readAndPreview);
  }

}



   const submitformfiles = async ()=>{
        const formData = new FormData(formdata);
        //formData.append("data", files);

        let raw = await fetch('http://127.0.0.1:3000/api/upload', {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+get(session).token
        },
        body: formData,
        });
        let data = await raw.text();
        console.log(data);
        getFiles()
        uploadPreview.innerHTML = "";
        uploadfile = [];
       console.log("file inviati");
   } 
</script>
<div class="columns" style="flex-wrap: wrap;">

{#each files as { _id,location,filename,type }, i}
<div class="column is-one-quarter"><img style="max-width:100%" alt="{filename}" src="http://127.0.0.1:3000/upload/{location}"/></div>

{/each}
</div>




<div>
<h1>Send file</h1>
<form  method="POST" enctype="multipart/form-data" bind:this={formdata}>

<input class="input" type="file" name="data" multiple bind:files={uploadfile} on:change={changefile}>

<div bind:this={uploadPreview}>

</div>


<a class="button" on:click={submitformfiles}>Upload</a>
</form>
</div>