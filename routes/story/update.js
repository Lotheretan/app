import Route from '@ember/routing/route';
import EmberObject, {set,get} from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return new RSVP.hash({
      story: this.get('store').findRecord('story',params.story_id),
      project: this.modelFor("project"),
      developers: this.get('store').findAll('developer'),
      idDeveloper:[],
      idTags:[],
      tags: this.get('store').findAll('tag'),
      colors:['black','blue','green','orange','pink','purple','red','teal','yellow','positive','negative'],
      tag: EmberObject.create({})
    });
  },
  afterModel(model){
    set(model,'data',EmberObject.create(JSON.parse(JSON.stringify(model.story))));
  },
  actions:{
    didTransition() {
      Ember.run.next(this, 'initUI');
    },
    save(story,data){

      let model = this.modelFor(this.routeName);
      let project=get(model,'project');
      set(story,'code',data.code);
      set(story,'description',data.description);
      let idDeveloper = get(model, 'idDeveloper');
      let dev =get(model, 'developers').find(dev => dev.id == idDeveloper);
      story.set('developer', dev);

      let idTags=get(model,'idTags');
      let tags=get(model,'tags').filter((item, index) => idTags.includes(item.id));
      story.set('tags',tags);
      let self=this;
      story.save().then(()=>{
        project.save().then(()=>{this.transitionTo("project",project);});
      })
    },
    cancel(){
      let model = this.modelFor(this.routeName);
      let project=get(model,'project');
      this.transitionTo("project",project);
    },
    newTag(tag){
      tag=this.get('store').createRecord('tag',{title:tag.title,color:tag.color});
      let self=this;
      tag.save().then(()=>{
        let model = self.modelFor(this.routeName);
        Ember.$('#ddTags').dropdown('set selected',tag.id);
        set(model,'tag',EmberObject.create({}));
      });
    }
  },
  initUI() {
    Ember.$('.ui.dropdown').dropdown();
  }
});

