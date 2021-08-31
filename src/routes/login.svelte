<script>
  import {session }  from '../utils/session'
  let mail = "";
  let password = "";
  let keeplogin = "false";

  const handleSubmit = async()=>{
    console.log({mail,password,keeplogin});

    const data = await fetch("http://127.0.0.1:3000/login",{
        method:"POST",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body:JSON.stringify({mail,password,keeplogin})
    });
    const token = await data.text();
    console.log(token);
    if(token.length > 15){
        session.set({token, authenticated:true});
        console.log("session settata \n >Token : "+token)
    }
  }

</script>


<section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box"on:submit|preventDefault={handleSubmit}>
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required bind:value={mail} >
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>  
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input type="password" placeholder="*******" class="input" required bind:value={password} >
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox"  >
                  <input type="checkbox" bind:checked={keeplogin}>
                 Remember me
                </label>
              </div>
              <div class="field">
                <button class="button is-success">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>