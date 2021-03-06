import Route from '@ember/routing/route';
import EmberObject, {set,get} from '@ember/object';
import RSVP from 'rsvp';
import Ember from 'ember';

export default Route.extend({
    templateName: 'story/update',
    model(params){
    return RSVP.hash({
        idDeveloper:[],
        idTags:[],
        tags: this.get('store').findAll('tag'),
        colors:['black','blue','green','orange','pink','purple','red','teal','yellow','positive','negative'],
        story    : this.get('store').findRecord('story',params.story_id),
        oldStory    : this.get('store').findRecord('story',params.story_id),
        developers  : this.get('store').findAll('developer'),
        project     : this.modelFor('project')
    });
  },
  afterModel(model){
      let newStory=EmberObject.create(JSON.parse(JSON.stringify(model.oldStory)));
      Ember.set(model,'newStory',newStory);
      Ember.set(model,'idDeveloper',model.oldStory.get('developer').get('id'));
  },
  actions:{
    didTransition() {
      Ember.run.next(this, 'initUI');
    },
    save(oldStory,newStory){

      let model = this.modelFor(this.routeName);
      let project=Ember.get(model,'project');
        oldStory.set('code',newStory.code);
        oldStory.set('description',newStory.description);
        oldStory.set('project', project);
      let idDeveloper = Ember.get(model, 'idDeveloper');
      let dev =Ember.get(model, 'developers').find(dev => dev.id == idDeveloper);
        oldStory.set('developer', dev);

      let idTags=Ember.get(model,'idTags');
      let tags=Ember.get(model,'tags').filter((item, index, self) => idTags.includes(item.id));
        oldStory.set('tags',tags);
      let self = this;
        oldStory.save().then(()=>{
        project.save().then(()=>{self.transitionTo("project",project);});
      })
    },
    cancel(){
      let model = this.modelFor(this.routeName);
      let project=Ember.get(model,'project');
      this.transitionTo("project",project);
    },
    newTag(tag){
      tag=this.get('store').createRecord('tag',{title:tag.title,color:tag.color});
      let self=this;
      tag.save().then(()=>{
        let model = self.modelFor(this.routeName);
        Ember.$('#ddTags').dropdown('set selected',tag.id);
        Ember.set(model,'tag',EmberObject.create({}));
      });
    }
  },
  initUI() {
    Ember.$('.ui.dropdown').dropdown();
  }
});

