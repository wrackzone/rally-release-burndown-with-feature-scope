describe("When making a TSDay model for story ToDo when rolled up to feature",function(){
    
    var PI_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","PortfolioItem","PortfolioItem","PortfolioItem/Feature"];
    var Story_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","Requirement","HierarchicalRequirement","HierarchicalRequirement"];
    
    it("should get todo eliminating acceptance when feature is fully done",function(){
        var day = Ext.create('TSDay',{});
        
        expect(day.get('leafSizeFieldName')).toEqual('LeafStoryPlanEstimateTotal');
        expect(day.get('leafAcceptedSizeFieldName')).toEqual('AcceptedLeafStoryPlanEstimateTotal');
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3, PercentDoneByStoryPlanEstimate: 0.25 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 15, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3, PercentDoneByStoryPlanEstimate: 0.25 });
        var snap3 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 25, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3, PercentDoneByStoryPlanEstimate: 1 });
            
        snap1.set('_TypeHierarchy',Story_TypeHierarchy);
        snap2.set('_TypeHierarchy',PI_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('leafAcceptedTotal')).toEqual(35);
        expect(day.get('leafTotal')).toEqual(40);
        expect(day.get('leafUnacceptedTotal')).toEqual(15);
        expect(day.get('piUnacceptedTotal')).toEqual(4);
    });
    
});