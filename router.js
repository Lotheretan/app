import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('projects', function() {
    this.route('new');
    this.route('delete',{ path: 'delete/:project_id' });
    this.route('update',{ path: 'update/:project_id' });
  });
  this.route('developers', function() {
    this.route('new');
    this.route('update',{ path: 'update/:developer_id' });
    this.route('delete',{ path: 'delete/:developer_id' });
  });
  this.route('project',{ path: 'project/:project_id' });

  this.route('story', function() {
    this.route('new', {path: 'new/:project_id'});
    this.route('update', {path: 'update/:story_id'});
    this.route('delete', {path: 'delete/:story_id'});
  });
  this.route('tag', function() {
    this.route('update', {path: 'update/:tag_id'});
    this.route('delete', {path: 'delete/:tag_id'});
  });
  this.route('step', function() {
    this.route('new', {path: 'new/:step_id'});
    this.route('update', {path: 'update/:step_id'});
    this.route('delete', {path: 'delete/:step_id'});
  });
  this.route('connexion');
  this.route('developer');
});

export default Router;
