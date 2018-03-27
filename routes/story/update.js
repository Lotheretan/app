import Route from '@ember/routing/route';
import EmberObject, {set} from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return new RSVP.hash({
      storyy: this.get('store').findRecord('story',params.story_id)
    });
  },
  afterModel(model){
    set(model,'data',EmberObject.create(JSON.parse(JSON.stringify(model.storyy))));
  },
  actions:{
    save(storyy,data){
      set(storyy,'code',data.code);
      set(storyy,'description',data.description);

      storyy.save().then(()=>{
        this.transitionTo("project");
      })
    },
    cancel(){
      this.transitionTo("project");
    }
  }
});
