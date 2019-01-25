/**
 * Created by Tran on 8/5/2015.
 */


function OrgUnit()
{
    var me = this;

	//me.jsonData;

	me.selectedOUs = [];

	//me.ouListTag = $( "input.orgUnitAssociations" );
	
	// ----------------------------------
	
    me.initialSetup = function()
	{
        selectionTreeSelection.setMultipleSelectionAllowed( true );

        selectionTreeSelection.setListenerFunction( me.listenerFunction );
	}

	// ----------------------------------

	me.clearTree = function()
	{
		me.selectedOUs = [];
		selectionTree.clearSelectedOrganisationUnits();
	}


	me.getSelectedOUs = function()
	{
        return me.selectedOUs;
	}


	me.setUpTree = function( jsonData )
	{
        selectionTree.clearSelectedOrganisationUnits();
        selectionTree.buildSelectionTree();


		if ( jsonData === undefined )
		{
			// New case.
			me.selectedOUs = [];
		}
		else
		{
			// set the loaded to 'selectedOUs' - in case nothing was touchec
			me.selectedOUs = jsonData.organisationUnits;

			me.populateTree( jsonData.organisationUnits );
		}
	}

	me.populateTree = function( organisationUnits )
    {	
        //selectionTreeSelection.setMultipleSelectionAllowed( true );
        //selectionTree.clearSelectedOrganisationUnits();
        //selectionTree.buildSelectionTree();

        //selectionTreeSelection.setListenerFunction( me.listenerFunction );
		
		if( organisationUnits !== undefined )
		{
			selectionTreeSelection.collapseTree( $( '#selectionTree' ) );

			setTimeout( function()
			{
				$.each( organisationUnits, function( i_ou, item_ou )
				{
					me.selectOrgUnit( item_ou );
				});

			}, 500 );
		}
    };

    me.listenerFunction = function( orgUnits, orgUnitNames )
    {
        var selected = [];

        for( var i=0; i< orgUnits.length; i++) 
		{
			var parents = selectionTree.getParents( orgUnits[i] );

			selected.push({ "id": orgUnits[i], "name": orgUnitNames[i], "parents": parents, "level" : parents.length + 1 });
        }
		
		me.selectedOUs = selected;

		//me.ouListTag.val( JSON.stringify( selected  ) );
    };
	
	
	me.selectOrgUnit = function( orgUnit )
	{
		//selectionTreeSelection.collapseTree( $( '#selectionTree' ) );

		//setTimeout( function()
		//{
			//console.log( 'orgUnit.ancestors: ' + JSON.sti
			selectionTreeSelection.expandTree( orgUnit.ancestors, 1, function()
			{
				selectionTreeSelection.select( orgUnit.id, true );						
			});

		//}, 1000 );
	}


	// --------------------------

    me.initialSetup(); 
}

