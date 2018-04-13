import Controller from '@ember/controller';

export default Controller.extend({
  session : Ember.inject.service(),
  action : {
    logout(){
      this.get("session").logout();
      this.transitionToRoute('developper');
    }
  }
});
