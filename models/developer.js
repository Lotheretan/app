import DS from 'ember-data';

export default DS.Model.extend({
  identity:DS.attr('string'),
  password:DS.attr('string'),
  projects: DS.hasMany('project',{inverse:'developers'}),
  toString:function(){
    return this.get('identity');
  }
});
