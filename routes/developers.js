import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
    return RSVP.hash({
      developers:this.get('store').findAll('developer',{include:"projects"}),
      fields:[{name:'identity',component:'lbl-value',caption:'Identity'},{name:'password',component:'mask-password-compo',caption:"Password"}],
      operations:[{icon:'red remove',link:'developers.delete'},{icon:'edit',link:'developers.update'},{icon:'eye',link:'developer'}]
    });
  }
});
