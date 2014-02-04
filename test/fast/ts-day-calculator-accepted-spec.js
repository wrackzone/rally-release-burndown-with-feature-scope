describe("When making a TSDay model for story acceptance",function(){
    
    var PI_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","PortfolioItem","PortfolioItem","PortfolioItem/Feature"];
    var Story_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","Requirement","HierarchicalRequirement","HierarchicalRequirement"];
    
    it("should calculate by count when given different record types",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_PIPlanEstimate'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4, PlanEstimate:4, ScheduleState: 'Accepted' });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7, PlanEstimate:4, ScheduleState: 'Defined' });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9, PlanEstimate:4, ScheduleState: 'Accepted' });
        
        snap1.set('_TypeHierarchy',Story_TypeHierarchy);
        snap2.set('_TypeHierarchy',Story_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('wpAcceptedTotal')).toEqual(4);
    });
           
    it("should calculate by count when given different states",function(){
        var day = Ext.create('TSDay',{
            wpSizeFieldName:'PlanEstimate'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, PlanEstimate:4, ScheduleState: 'Accepted' });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, PlanEstimate:7, ScheduleState: 'Defined' });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, PlanEstimate:9, ScheduleState: 'Defined' });
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('wpAcceptedTotal')).toEqual(4);
    });
    
               
    it("should calculate by count accepted",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'Count',
            wpSizeFieldName:'Count'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4, PlanEstimate:10, ScheduleState: 'Accepted'  });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7, PlanEstimate:20, ScheduleState: 'Defined' });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9, PlanEstimate:30, ScheduleState: 'Accepted' });
        
        snap1.set('_TypeHierarchy',Story_TypeHierarchy);
        snap2.set('_TypeHierarchy',Story_TypeHierarchy);
        snap3.set('_TypeHierarchy',Story_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('wpAcceptedTotal')).toEqual(2);
    });
 
});