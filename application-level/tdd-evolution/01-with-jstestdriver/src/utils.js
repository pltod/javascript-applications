/**
 * The Creator's prototype points to the Citizen which we inherit.
 * Nasledqvame attributite na Citizen-a kakto i vsichko po prototipnata veriga
 *
 * Drawbacks:
 *	Not able to pass parameters to the parent
 *  Inherit data that is specific for the parent instance not only data from parent prototype
 */
function classicInheritance1(Creator, ParentCreator) {
	Creator.prototype = new ParentCreator(); //new ParentCreator() = createParent();
}

function classicInheritance1_1(Creator, Parent) {
	Creator.prototype = Parent;
}

/**
 * We create new Citizen bazed on passed Citizen.
 * Za celta si definirame Creator, kazvame che Model-a mu e podadeniq Citizen i vrushtame suzdaden nov Citizen s nego.
 * 
 * Spored men tova ima sashtite nedostataci kato classicInheritance1. 
 * Vtoriq moje lesno da se preodolee kato kato parameter na funkciqtada podadem Model, a ne Citizen.
 */
function prototypalInheritance(o){
	function Creator () {}
	Creator.prototype = o;
	return new Creator();	//new Creator() = createDataHolder();
}


