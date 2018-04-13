import Controller from '@ember/controller';

export default Controller.extend({
  session : Ember.inject.service(),
  action : {
    login(){
      let {username, password}= this.getproperties('username', 'password');
      this.get("session").login(username, password).then(()=>{
        this.transitionToPreviousRoute()
      }).catch((reason)=>{
        console.log("Error : ",reason)
      })

    }
  },
  transitionToPreviousRoute(){
    var previousTransition = this.get('previousTransition');
    if (previousTransition){
      this.set('previousTransition', null);
      previousTransition.retry();
    }else{
      //Default back to homepage
      this.transitionRoute('index');
    }
  }
});
