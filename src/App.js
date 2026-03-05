import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, LineChart, Line, CartesianGrid } from "recharts";

const SUPABASE_URL = "https://iwkfribpdpaeglaogxkx.supabase.co";
const SUPABASE_KEY = "sb_publishable_3Jb6ozoasZI7Xa0In9SSEA_UZkq-IiS";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


const DATA = [
  ["Paul Corbeil","Boston Bruins","NHL","Paraphe Sports Management","Paul Corbeil","paulcorbeil@paraphe.ca","Contacted"],
  ["Frederic Brunet","Boston Bruins","NHL","Paraphe Sports Management","Paul Corbeil","paulcorbeil@paraphe.ca","Contacted"],
  ["Patrick O'Connell","Seattle Seahawks","NFL","Steinberg Sports","Cameron Foster","cameron@steinbergsports.com","Contacted"],
  ["Devon Witherspoon","Seattle Seahawks","NFL","CAA","Tory Dandy","tdandy@athletesfirst.net","Contacted"],
  ["Seth Coleman","Seattle Seahawks","NFL","Goal Line Football","Joseph Behar","jbehar@goallinefootball.com","Contacted"],
  ["Connor O'Toole","Seattle Seahawks","NFL","Aura Sports Group","Ness Mugrabi","ness@aurasmg.com","Contacted"],
  ["Tyron Broden","Seattle Seahawks","NFL","Net Sports Management","John Hamood","johnny@netsportsmgmt.com","Contacted"],
  ["Zy Alexander","Seattle Seahawks","NFL","Equity Sports","Marcus Cromartie","marcus@equity-sports.com","Contacted"],
  ["DeMarcus Lawrence","Seattle Seahawks","NFL","Aura Sports Group","Ness Mugrabi","ness@aurasmg.com","Negotiating"],
  ["Drew Lock","Seattle Seahawks","NFL","CAA","Jimmy Sexton","jsexton@caa.com","Contacted"],
  ["Kenneth Walker III","Seattle Seahawks","NFL","Sport Trust Advisors","Ben Setas","ben@sportstrust.com","Contacted"],
  ["Mike Morris","Seattle Seahawks","NFL","VaynerSports","Mike McCartney","mikemac@VaynerSports.com","Negotiating"],
  ["Leonard Williams","Seattle Seahawks","NFL","Independent Sports","Roosevelt Barnes","rbarnes@iseworldwide.com","Contacted"],
  ["Marshall Lang","Seattle Seahawks","NFL","Dynamic Sports Group","Greg Brookey","gbrookey@dynamicsportsgrp.com","Contacted"],
  ["Elijah Arroyo","Seattle Seahawks","NFL","Rosenhaus Sports","Drew Rosenhaus","dr@rsragency.com","Contacted"],
  ["Ty Okada","Seattle Seahawks","NFL","United Athlete Sports","Evan Brennan","evan@uasports.us","Contacted"],
  ["Tyler Hall","Seattle Seahawks","NFL","International Sports Agency","Bardia Ghahremani","bardia@isasports.com","Contacted"],
  ["Dareke Young","Seattle Seahawks","NFL","Sport Trust Advisors","Ben Setas","ben@sportstrust.com","Contacted"],
  ["Jaxon Smith-Njigba","Seattle Seahawks","NFL","WME","Joel Segal","jsegal@wmeagency.com","Contacted"],
  ["Boye Mafe","Seattle Seahawks","NFL","VaynerSports","Mike McCartney","mikemac@VaynerSports.com","Contacted"],
  ["Zach Charbonnet","Seattle Seahawks","NFL","VaynerSports","Mike McCartney","mikemac@VaynerSports.com","Contacted"],
  ["Jake Bobo","Seattle Seahawks","NFL","Wasserman","Steve Caric","steve.caric@teamwass.com","Contacted"],
  ["Johnathan Hankins","Seattle Seahawks","NFL","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
  ["Tariq Woolen","Seattle Seahawks","NFL","Sport Stars","Jason Chayut","Jchayut@sportstarsnyc.com","Contacted"],
  ["Charles Cross","Seattle Seahawks","NFL","Klutch Sports Group","Nicole Lynn","nlynn@klutchgroup.com","Contacted"],
  ["Jalen Milroe","Seattle Seahawks","NFL","Klutch Sports Group","Nicole Lynn","nlynn@klutchgroup.com","Contacted"],
  ["Isaiah Iton","Seattle Seahawks","NFL","Delta Sports Group","Jesse Foreman","thenflagent@gmail.com","Negotiating"],
  ["Jaylen Waddle","Miami Dolphins","NFL","GSE Worldwide","Ian Grutman","lgrutman@gseworldwide.com","Contacted"],
  ["De'Von Achane","Miami Dolphins","NFL","Roc Nation","Leah Knight","lknight@rocnation.com","Contacted"],
  ["Jordyn Brooks","Miami Dolphins","NFL","Roc Nation","Erik Burkhardt","eb@rocnation.com","Contacted"],
  ["Minkah Fitzpatrick","Miami Dolphins","NFL","Ripple Sports","Bijan Heravi","bijan@ripplesports.com","Contacted"],
  ["Kenneth Grant","Miami Dolphins","NFL","Athletes First","Andre Odom","aodom@athletesfirst.net","Contacted"],
  ["Darren Waller","Miami Dolphins","NFL","Rosenhaus Sports","Drew Rosenhaus","dr@rsragency.com","Contacted"],
  ["Liam Eichenberg","Miami Dolphins","NFL","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
  ["Rasul Douglas","Miami Dolphins","NFL","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
  ["Jake Bailey","Miami Dolphins","NFL","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
  ["Andre Cisco","New York Jets","NFL","Athletes First","David Mulugheta","dmulugheta@athletesfirst.net","Contacted"],
  ["Irvin Charles","New York Jets","NFL","Athletes First","Andre Odom","aodom@athletesfirst.net","Contacted"],
  ["Isaiah Davis","New York Jets","NFL","Wasserman","Michael Swenson","mswenson@teamwass.com","Contacted"],
  ["Olu Fashanu","New York Jets","NFL","CAA","Patrick Collins","patrick.collins@caa.com","Contacted"],
  ["Israel Abanikanda","New York Jets","NFL","First Round Management","Malki Kawa","malki007@aol.com","Negotiating"],
  ["Davante Adams","New York Jets","NFL","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
  ["Morgan Moses","New York Jets","NFL","Upper Edge Management","Andy Ross","andy@upperedgesports.com","Contacted"],
  ["Aaron Brewer","Arizona Cardinals","NFL","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
  ["Bilal Nichols","Arizona Cardinals","NFL","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
  ["Jonah Williams","Arizona Cardinals","NFL","Excel Sports Management","Ryan Tollner","rtollner@excelsm.com","Contacted"],
  ["Calais Campbell","Arizona Cardinals","NFL","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
  ["Marvin Harrison Jr.","Arizona Cardinals","NFL","Harrison Incorporated","Marvin Harrison Jr.","mhj@harrisonincorporated.com","Contacted"],
  ["Dorian Singer","Arizona Cardinals","NFL","All Pro Sports","Lamont Smith","clsmith@apse.net","Contacted"],
  ["Jonathan Ward","Arizona Cardinals","NFL","Pyramid Sports Group","Orlando Arnold","orlando@pyramidsportsgroup.com","Contacted"],
  ["Richard Gouraige","Buffalo Bills","NFL","Agency 1 AMG","Aston Wilson","aston@astonsportsreps.com","Contacted"],
  ["Connor McGovern","Buffalo Bills","NFL","WME","Joel Segal","jsegal@wmeagency.com","Contacted"],
  ["Khalil Shakir","Buffalo Bills","NFL","Equity Sports","Chris Cabott","chris@equity-sports.com","Contacted"],
  ["Keon Coleman","Buffalo Bills","NFL","Just Win Management","Joe Hernandez","joe@justwin.us","Contacted"],
  ["Josh Palmer","Buffalo Bills","NFL","The Sports Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
  ["Lamar Jackson","Baltimore Ravens","NFL","Synergy Sports","Josh Arnold","josh@synergysportsonline.com","Contacted"],
  ["Zay Flowers","Baltimore Ravens","NFL","WIN Sports Group","Patrick Whitesell","contact@winsg.com","Contacted"],
  ["Malaki Starks","Baltimore Ravens","NFL","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
  ["Ronnie Stanley","Baltimore Ravens","NFL","Roc Nation","Kim Miale","km@rocnation.com","Contacted"],
  ["Keaton Mitchell","Baltimore Ravens","NFL","Generation Sports","Christian Kranz","christian@generationsportsgroup.com","Contacted"],
  ["Ja'Marr Chase","Cincinnati Bengals","NFL","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
  ["Tee Higgins","Cincinnati Bengals","NFL","Alliance Sports","Caitlin Aoki","caitlin@alliance-sports.com","Contacted"],
  ["Trey Hendrickson","Cincinnati Bengals","NFL","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
  ["Ja'Quan McMillian","Tampa Bay Buccaneers","NFL","Day 1 Sports","Deryk Gilmore","deryk.g@day1sports.com","Negotiating"],
  ["Mike Evans","Tampa Bay Buccaneers","NFL","Day 1 Sports","Deryk Gilmore","deryk.g@day1sports.com","Contacted"],
  ["Brock Purdy","San Francisco 49ers","NFL","Range Media Partners","Kyle Strongin","kstrongin@rangemp.com","Contacted"],
  ["George Kittle","San Francisco 49ers","NFL","JB Sports","Jack Bechta","jack@nfladvisor.com","Contacted"],
  ["Travis Kelce","Kansas City Chiefs","NFL","Milk & Honey Sports","Jacob Presser","jmpresser@gmail.com","Contacted"],
  ["Patrick Mahomes","Kansas City Chiefs","NFL","1UP Sports Marketing","Jacquelyn Dahl","jd@1upsportsmarketing.com","Contacted"],
  ["Chris Jones","Kansas City Chiefs","NFL","Katz Brothers Sports","Jason Katz","jason@katzbrotherssports.com","Contacted"],
  ["Antonio Johnson","Kansas City Chiefs","NFL","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
  ["Saquon Barkley","Philadelphia Eagles","NFL","LBI Entertainment","Ken Katz","kk@lbient.com","Contacted"],
  ["Nakobe Dean","Philadelphia Eagles","NFL","A3 Athletics","Chad Speck","ike@replegacy.com","Contacted"],
  ["Bo Nix","Denver Broncos","NFL","QB Reps","Peter Webb","peter@qbreps.com","Contacted"],
  ["Caleb Williams","Chicago Bears","NFL","Barnburner Sports","AJ Romeo","aromeo@barnburnermktg.com","Contacted"],
  ["Jayden Daniels","Washington Commanders","NFL","EAG Sports","Denise White","denise.white@eagsportmanagement.com","Contacted"],
  ["Terry McLaurin","Washington Commanders","NFL","The Society Management","Bronson Sanich","bronson@thesociety.us","Contacted"],
  ["Jonathan Allen","Washington Commanders","NFL","Everett Sports Marketing","Jeff Crandall","jeff@thisisesm.com","Contacted"],
  ["Jahmal Banks","Washington Commanders","NFL","Dream Point Sports","Tony Paige","tpaige@dpointsports.com","Contacted"],
  ["Cooper Kupp","Los Angeles Rams","NFL","Royalty Management","Tzvi Grossman","tgrossman@royaltymanagementgoup.com","Contacted"],
  ["Ladd McConkey","Los Angeles Chargers","NFL","Everett Sports Marketing","Jeff Hoffman","jeff@thisisesm.com","Contacted"],
  ["Kevin Givens","Las Vegas Raiders","NFL","Prolifiq Sports","Kaveh Akbari","Kaveh@greyshot.co","Negotiating"],
  ["Travon Walker","Jacksonville Jaguars","NFL","Elite Loyalty Sports","Vincent Taylor","VTaylor@elsportsinc.com","Contacted"],
  ["Alvin Kamara","New Orleans Saints","NFL","DR31 Sports","David Raymond","david@dr31sports.com","Contacted"],
  ["Diontae Johnson","Carolina Panthers","NFL","QC Sports","Bradley Cicala","brad@qcsports.com","Contacted"],
  ["Malik Nabers","New York Giants","NFL","CMV Sports","Damien Butler","damien.butler@cmvsports.com","Contacted"],
  ["Josh Jacobs","Green Bay Packers","NFL","Black Label Sports","Chad Wiestling","wiestling@blacklabelsportsgroup.com","Contacted"],
  ["Tony Pollard","Tennessee Titans","NFL","MS World LLC","Kennard McGuire","kmcguire@msworldllc.com","Contacted"],
  ["Kyle Dugger","New England Patriots","NFL","1 of 1 Agency","Andy Simms","andy@1of1agency.com","Contacted"],
  ["Rhamondre Stevenson","New England Patriots","NFL","SIEGE","Brian Hannula","brian@siegerep.com","Contacted"],
  ["Anthony Richardson","Indianapolis Colts","NFL","Legacy Sports Advisors","Deiric Jackson","deiricjackson@gmail.com","Contacted"],
  ["Evan Hull","Indianapolis Colts","NFL","One West Sports","Christopher Gittings","chrisg@onewestsports.com","Contacted"],
  ["Joe Mixon","Houston Texans","NFL","Authentic Athletix","Peter Schaffer","peter@agentaa.com","Contacted"],
  ["Stefon Diggs","Houston Texans","NFL","SMAC Entertainment","Constance Schwartz-Morini","cs@smac-ent.com","Contacted"],
  ["Keaton Wallace","Atlanta Hawks","NBA","Excel Sports Management","Max Lipsett","mlipsett@excelsm.com","Contacted"],
  ["Onyeka Okongwu","Atlanta Hawks","NBA","Excel Sports Management","Jordan Gertler","jgertler@excelsm.com","Contacted"],
  ["Garrison Mathews","Atlanta Hawks","NBA","The Sports Law Group","Chris Patrick","cpatrick@thesportslawgroup.com","Contacted"],
  ["N'Faly Dante","Atlanta Hawks","NBA","Klutch Sports Group","Shayaun Saee","ssaee@klutchgroup.com","Contacted"],
  ["Damien Arletti","Atlanta Hawks","NBA","Sports International Group","Sammy Wloszczowski","sammyw@sigsports.com","Contacted"],
  ["Hugo Gonzalez","Boston Celtics","NBA","ProMondo Sports","Matt Bollero","matt@promondosports.com","Contacted"],
  ["Kristaps Porzingis","Boston Celtics","NBA","FUTURE Sports Group","Janis Porzingis","porzingis@hotmail.com","Contacted"],
  ["Jaden Springer","Boston Celtics","NBA","A3 Athletics","Isaac Conner","ike@replegacy.com","Contacted"],
  ["Jordan Walsh","Boston Celtics","NBA","On Time Agency","Ramon Sessions","ramon@ontimeagencygroup.com","Contacted"],
  ["Terance Mann","Brooklyn Nets","NBA","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
  ["Keon Johnson","Brooklyn Nets","NBA","Klutch Sports Group","Anthony Fields","afields@klutchgroup.com","Contacted"],
  ["Kon Knueppel","Charlotte Hornets","NBA","Priority Sports","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
  ["Brandon Miller","Charlotte Hornets","NBA","VaynerSports","AJ","aj@vaynersports.com","Negotiating"],
  ["Wendell Moore Jr.","Charlotte Hornets","NBA","LIFT Sports Management","Mike Miller","mm@liftsm.com","Contacted"],
  ["Matas Buzelis","Chicago Bulls","NBA","Excel Sports Management","Michael Tellem","mtellem@excelsm.com","Contacted"],
  ["Jaden Ivey","Chicago Bulls","NBA","CAA","Austin Brown","austin.brown@caa.com","Contacted"],
  ["Josh Giddey","Chicago Bulls","NBA","Lighthouse Sports","Daniel","daniel@lighthousesportsmgmt.com","Contacted"],
  ["Max Strus","Cleveland Cavaliers","NBA","Priority Sports","Kieran Piller","kieranp@prioritysports.biz","Contacted"],
  ["Dean Wade","Cleveland Cavaliers","NBA","Next Sports Agency","Adam Papas","adampapas.nextsports@gmail.com","Contacted"],
  ["Craig Porter Jr.","Cleveland Cavaliers","NBA","Always On PRS","Ryan Straining","ryan@alwaysonprs.com","Contacted"],
  ["Kyrie Irving","Dallas Mavericks","NBA","A11Even Sports","Shetellia Riley","shetellia@aol.com","Contacted"],
  ["Miles Kelly","Dallas Mavericks","NBA","Verus Management","Aaron Turner","aturner@verusteam.com","Negotiating"],
  ["Moussa Cisse","Dallas Mavericks","NBA","LIFT Sports Management","Yann Balikouzou","yb@liftsm.com","Contacted"],
  ["Christian Braun","Denver Nuggets","NBA","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Julian Strawther","Denver Nuggets","NBA","Wasserman","Darren Matsubara","dmatsubara@teamwass.com","Contacted"],
  ["Duncan Robinson","Detroit Pistons","NBA","Glushon Sports","Jason Glushon","jg@glushonsm.com","Contacted"],
  ["Ron Holland","Detroit Pistons","NBA","Priority Sports","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
  ["Alperen Sengun","Houston Rockets","NBA","Wasserman","Chafie Fields","cfields@teamwass.com","Contacted"],
  ["Jabari Smith Jr.","Houston Rockets","NBA","Prather Sports","Wallace Prather","wallaceprather@gmail.com","Contacted"],
  ["Tari Eason","Houston Rockets","NBA","Siegel Sports","Michael Siegel","info@sseagency.com","Contacted"],
  ["Amen Thompson","Houston Rockets","NBA","GAPP Sports","Troy","maatausar@gmail.com","Contacted"],
  ["Andrew Nembhard","Indiana Pacers","NBA","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Bennedict Mathurin","Indiana Pacers","NBA","Innovate Sports","Nima Namakian","nnamakian@innovatesportsgroup.com","Contacted"],
  ["Buddy Hield","Indiana Pacers","NBA","Icona Agency","Diana Day","diana@iconaagency.com","Contacted"],
  ["Aaron Nesmith","Indiana Pacers","NBA","Excel Sports Management","Mike Lindeman","mike@excelsm.com","Contacted"],
  ["Ben Sheppard","Indiana Pacers","NBA","GSL Sports Group","George Langberg","gsl@gslsportsgroup.com","Contacted"],
  ["TyTy Washington Jr.","LA Clippers","NBA","LIFT Sports Management","Kevin Bradbury","kbradbury@liftsm.com","Contacted"],
  ["James Harden","LA Clippers","NBA","Equity Sports","Brandon Grier","brandon@equitybasketball.com","Contacted"],
  ["Nicolas Batum","LA Clippers","NBA","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
  ["Christian Koloko","Los Angeles Lakers","NBA","Klutch Sports Group","Calvin Andrews","candrews@klutchgroup.com","Contacted"],
  ["RJ Davis","Los Angeles Lakers","NBA","Glushon Sports","Jason Glushon","jg@glushonsm.com","Negotiating"],
  ["Santi Aldama","Memphis Grizzlies","NBA","CAA","Aaron Mintz","aaron.mintz@caa.com","Negotiating"],
  ["Desmond Bane","Memphis Grizzlies","NBA","Gersh","Maxwell Wiepking","mwiepking@gersh.com","Contacted"],
  ["GG Jackson II","Memphis Grizzlies","NBA","Famo Sports","Donnell","Dnell38@yahoo.com","Contacted"],
  ["Jaime Jaquez Jr.","Miami Heat","NBA","CAA","Aaron Mintz","aaron.mintz@caa.com","Negotiating"],
  ["Norman Powell","Miami Heat","NBA","Glushon Sports","Jason Glushon","jg@glushonsm.com","Negotiating"],
  ["Dru Smith","Miami Heat","NBA","AMR Agency","Aaron Reilly","aaron@amragencyllc.com","Contacted"],
  ["Thanasis Antetokounmpo","Milwaukee Bucks","NBA","Octagon","Alex Saratsis","alexandros.saratsis@octagon.com","Contacted"],
  ["Dame Lillard","Milwaukee Bucks","NBA","Goodwin Sports","Aaron Goodwin","agood7@goodwinsports.com","Contacted"],
  ["Micah Potter","Milwaukee Bucks","NBA","Edge Sports International","Sam Cipriano","scipriano@edgesportsintl.com","Contacted"],
  ["Rudy Gobert","Minnesota Timberwolves","NBA","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
  ["Jesse Edwards","Minnesota Timberwolves","NBA","Wasserman","Joe Smith","jsmith@teamwass.com","Contacted"],
  ["Elfrid Payton","New Orleans Pelicans","NBA","You First Sports","Darrell Comer Jr.","dcomer@csetalentrep.com","Contacted"],
  ["Yves Missi","New Orleans Pelicans","NBA","Wasserman","Jelani Floyd","jelani.floyd@teamwass.com","Contacted"],
  ["Chaz Lanier","New Orleans Pelicans","NBA","You First Sports","Deirunas Visockas","deirunas.visockas@youfirstsports.com","Contacted"],
  ["Dillon Jones","New York Knicks","NBA","Roc Nation","Sam Permut","sam@rocnation.com","Negotiating"],
  ["Delon Wright","New York Knicks","NBA","Wasserman","Ted Yeschin","tyeschin@teamwass.com","Contacted"],
  ["Deni Avdija","Portland Trail Blazers","NBA","2Talent Sports","Matan Siman-Tov","matan@2talent.co.il","Contacted"],
  ["Toumani Camara","Portland Trail Blazers","NBA","Up Tempo Management","David Putterie","info@uptempomanagement.com","Contacted"],
  ["Paul Reed","Philadelphia 76ers","NBA","Octagon","Ron Shade","ron.shade@octagon.com","Contacted"],
  ["Keon Ellis","Sacramento Kings","NBA","EZ Sports Group","Corey Marcum","info@ezsportsgroup.com","Contacted"],
  ["Trevelin Queen","Sacramento Kings","NBA","Hazan Sports","Daniel Hazan","daniel@hazansports.com","Negotiating"],
  ["Reece Beekman","San Antonio Spurs","NBA","The Familie","David Bauman","info@thefamilie.com","Contacted"],
  ["Stanley Umude","San Antonio Spurs","NBA","Assist Sports","Eric Fleisher","fleisher@assistsports.co","Contacted"],
  ["Kris Dunn","Utah Jazz","NBA","Thread Sports","Bernie Lee","bernie@threadsm.com","Contacted"],
  ["Jonathan Isaac","Orlando Magic","NBA","Prolifiq Sports","Tony Miranda","tmiranda@prolifichq.com","Contacted"],
  ["Kenrich Williams","Oklahoma City Thunder","NBA","Pensack Sports","Adam Pensack","adam@pensacksports.com","Contacted"],
  ["Dante Exum","Washington Wizards","NBA","The Landmark Sports Agency","Brandon Rosenthal","bmr@landmarksports.com","Contacted"],
  ["Jaylen Martin","Washington Wizards","NBA","Valor Sports Agency","Deddrick Faison","dfaison@valorsportsagency.com","Contacted"],
  ["Khabib Nurmagomedov","","UFC","Dominance MMA","Ali Abdelaziz","alijudo96@yahoo.com","Contacted"],
  ["Kamaru Usman","","UFC","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Justin Gaethje","","UFC","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Conor McGregor","","UFC","Paradigm Sports","Audie Attar","audie@paradigmsports.com","Contacted"],
  ["Jon Jones","","UFC","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Ilia Topuria","","UFC","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Derrick Lewis","","UFC","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Dominick Cruz","","UFC","First Round Management","Abe Kawa","ops@firstroundmanagement.com","Contacted"],
  ["Paddy Pimblett","","UFC","Intensity FM Management","Kalle Sauerland","thebaddy@intensitifm.com","Contacted"],
  ["Alex Caceres","","UFC","First Round Management","Jose Diaz","info@firstroundmanagement.com","Contacted"],
  ["Jeremy Swayman","Boston Bruins","NHL","Sports Professional Management","Lewis Gross","lewisgross@yahoo.com","Contacted"],
  ["Mason Lohrei","Boston Bruins","NHL","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
  ["Nikita Zadorov","Boston Bruins","NHL","Gold Star Hockey","Daniel Milstein","dmilstein@goldstarhockey.com","Contacted"],
  ["Josh Norris","Buffalo Sabres","NHL","Newport Sports","Craig Oster","coster@thehockeyagency.com","Contacted"],
  ["Zach Benson","Buffalo Sabres","NHL","RWG Sport Management","Ross","ross@rwgsportmanagement.com","Contacted"],
  ["Rasmus Andersson","Calgary Flames","NHL","4Sports Hockey","Claude Lemieux","lemieux@4sportsworld.com","Contacted"],
  ["Kevin Bahl","Calgary Flames","NHL","Wasserman","David Gagner","dgagner@teamwass.com","Contacted"],
  ["Cutter Gauthier","Anaheim Ducks","NHL","Wasserman","Kurt Overhardt","koverhardt@kosportsinc.com","Contacted"],
  ["Leo Carlsson","Anaheim Ducks","NHL","WIN Hockey Agency","Matt Keator","mkeator@winhockeyagency.com","Contacted"],
  ["Seth Jarvis","Carolina Hurricanes","NHL","The Sports Corporation","Gerry Johannson","gjohannson@tschockey.com","Contacted"],
  ["Lane Hutson","Montreal Canadiens","NHL","Quartexx Management","Sean Coffey","sean@quartexxmanagement.com","Contacted"],
  ["Dylan Guenther","Utah Mammoth","NHL","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
  ["Lukas Reichel","Chicago Blackhawks","NHL","RSG Hockey","Allain Roy","allain@rsghockey.com","Contacted"],
  ["Zach Hyman","Edmonton Oilers","NHL","Raze Sports","Todd Reynolds","toddr@razesports.com","Contacted"],
  ["Mavrik Bourque","Edmonton Oilers","NHL","Meridian Hockey","Dominic DeBlois","dominic@meridianhockey.com","Contacted"],
  ["Mitch Marner","Toronto Maple Leafs","NHL","Quartexx Management","Darren Ferris","darren@quartexxmanagement.com","Contacted"],
  ["Oliver Ekman-Larsson","Toronto Maple Leafs","NHL","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
  ["Marco Rossi","Minnesota Wild","NHL","The Will Sports Group","Ian","ian@willsportsgroup.com","Contacted"],
  ["Nino Niederreiter","Winnipeg Jets","NHL","Rufener Hockey","Andre Rufener","andre@rufenerhockey.com","Contacted"],
  ["Kevin Gausman","Toronto Blue Jays","MLB","Tidal Sports Group","Brodie Scoffield","bscoffield@tidalsportsgroup.com","Contacted"],
  ["Paul Skenes","Pittsburgh Pirates","MLB","Independent Sports","Mark Pieper","mpieper@iseworldwide.com","Contacted"],
  ["Gunnar Henderson","Baltimore Orioles","MLB","The Boras Corporation","Scott Boras","sb1@borascorp.com","Contacted"],
  ["Jackson Merrill","San Diego Padres","MLB","KHG Sports Management","Josh","Josh@khgsports.com","Contacted"],
  ["Aaron Judge","New York Yankees","MLB","PSI Sports Management","David","david@psisports.com","Contacted"],
  ["Francisco Alvarez","New York Mets","MLB","Rimas Sports","Sharon Rodriguez","srodriguez@rimassports.com","Contacted"],
  ["Ketel Marte","Arizona Diamondbacks","MLB","QC Sports","Alex Cotto","alex@qcsports.com","Contacted"],
  ["Austin Riley","Atlanta Braves","MLB","ALIGND Sports Agency","Matt","matt@aligndsports.com","Contacted"],
  ["Ozzie Albies","Atlanta Braves","MLB","SportsMeter","David Meter","dmeter@aol.com","Contacted"],
  ["Michael Harris II","Atlanta Braves","MLB","Munger English Sports","Clarence","clarence@mungerenglish.com","Contacted"],
  ["Logan Webb","San Francisco Giants","MLB","ACES","Sam Levinson","sam@acesinc1.com","Contacted"],
  ["Tommy Edman","Los Angeles Dodgers","MLB","Weisz Sports Management","Jonathan Weisz","jonathan.weisz@weiszsports.com","Contacted"],
  ["Andy Pages","Los Angeles Dodgers","MLB","Prime Sports Management","Tommy Barbella","tbarbella@primesportsagency.com","Contacted"],
  ["Sonny Gray","St. Louis Cardinals","MLB","McKinnis Sports","Bo McKinnis","mckinnissports@comcast.net","Contacted"],
  ["Brendan Donovan","St. Louis Cardinals","MLB","The Bledsoe Agency","Hunter Bledsoe","hunter@bledsoeagency.com","Contacted"],
  ["Junior Caminero","Tampa Bay Rays","MLB","Republik Sports","Rafa","rafa@gorepublik.com","Contacted"],
  ["Jason Adam","Tampa Bay Rays","MLB","Warner Sports Management","Erik Johnson","ejohnson@warnersportsmanagement.com","Contacted"],
  ["Trey Hendrickson","Cincinnati Bengals","MLB","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
  ["Jackson Chourio","Milwaukee Brewers","MLB","Beverly Hills Sports Council","Cesar","csuarez@bhscglobal.com","Contacted"],
  ["Brooks Lee","Minnesota Twins","MLB","Apex Baseball","Adam","adamk@apexbaseball.com","Contacted"],
  ["Roman Anthony","Boston Red Sox","MLB","Frontline Athlete Management","Matt","matt@frontlineam.com","Contacted"],
  ["Zach Neto","Los Angeles Angels","MLB","EnterSports Management","Gavin","gavin@enter-sports.com","Contacted"],
  ["Frederic Brunet","","","Paraphe Sports management","Paul Corbeil","paulcorbeil@paraphe.ca","Contacted"],
  ["Patrick O´conell","","","Steinberg sports management","cameron","cameron@steinbergsports.com","Contacted"],
  ["Devon Whitherspoon","","","CAA /elite one sports management","Tory dandy , Reginald Johnson","tdandy@athletesfirst.net /reggie23125@yahoo.com","Contacted"],
  ["Seth Coleman","","","Goal line fotball","joseph behar","jbehar@goallinefootball.com","Contacted"],
  ["Connor o´toole","","","Aura sports group","Ness mugrabi/ David canter","ness@aurasmg.com /david@aurasmg.com","Contacted"],
  ["Tyron Broden","","","Net sports management","John Hamood","johnny@netsportsmgmt.com","Contacted"],
  ["Zy Alexander","","","Equity sports","Marcus Cromartie","marcus@equity-sports.com","Contacted"],
  ["DeMarcus Lawrence","","","Aura sports group","Ness mugrabi/ David canter","ness@aurasmg.com /david@aurasmg.com","Contacted"],
  ["Drew lock","","","CAA","Jimmy sexton / thomas condom","jsexton@caa.com/thomas.condon@caa.com","Contacted"],
  ["Kenneth Walker III","","","Sport trust advisors","Ben Setas/ Pat Dye JR","ben@sportstrust.com/pat@sportstrust.com","Contacted"],
  ["Mike morris","","","Vayner Sports","Jaymeson moten/Mike mcartney","jaymeson@vaynersports.com/mikemac@VaynerSports.com","Contacted"],
  ["Leonard williams","","","Independent sports &entretainment","Rossevelt barnes/Jovan barnes/Michelle schmidt","rbarnes@iseworldwide.com/jbarnes@iseworldwide.com/mschmidt@iseworldwide.com","Contacted"],
  ["Marshall lang","","","Dynamic Sports Group","Greg brookey","gbrookey@dynamicsportsgrp.com","Contacted"],
  ["Elijah Arroyo","","","Rosenhaun Sports Representation","Drew Rosenhaus/Shawn O'Dare/Bari Wolfman","dr@rsragency.com/sod@rsragency.com/bw@rsragency.com","Contacted"],
  ["Ty Okada","","","United Athlete Sports","Evan Brennan","evan@uasports.us","Contacted"],
  ["Tyler Hall","","","International Sports Agency","Bardia Ghahremani","bardia@isasports.com","Contacted"],
  ["Dareke Young","","","Sport trust advisors","Ben Setas/ Pat Dye JR","ben@sportstrust.com/pat@sportstrust.com","Contacted"],
  ["Federico Maranges","","","Tessler Sports Managament","Brett Tesler","tesslersports@gmail.com","Contacted"],
  ["Ricky White III","","","JL Sports Agency","Joe linta","jlinta@comcast.net","Contacted"],
  ["Ryley Mills","","","CAA","RJ Conser / thomas condom","rj.gonser@caa.com/thomas.condon@caa.com","Contacted"],
  ["D´Anthony Bell","","","Exclusive Athlete Agency","Louis Bing","Louis@ExclusiveAthletesAgency.com","Contacted"],
  ["Uchenna Nwosu","","","Rosenhaun Sports Representation","Wade White Jr/Drew Rosenhaus/Bari Wolfman","wwhite@elite300se.com/dr@rsragency.com/bw@rsragency.com","Contacted"],
  ["Amari Kight","","","Grady Sports agency","Joshua grady / Ej Gonzalez","joshua@gradysports.com/ej@gradymediaconnect.com","Contacted"],
  ["Ernest Jones I","","","Agency 1 Athlete Management Group","Ira Turner/Ron Butler/Stanley Bien-Aime","iraturner@amglsports.com","Contacted"],
  ["Christian Haynes","","","Ace PR","Alejandra Cristina Ayalde","alejandra@acepr.net","Contacted"],
  ["Drake Thomas","","","MGC Sports","James courie","jcourie@mgclaw.com","Contacted"],
  ["Derick Hall","","","National Sports Agency","Harold Lewis/Ezra Thompson/Chad Berger","haroldclewis@cs.com/ezra.thompson@nsafootball.com/chad.berger@nsafootball.com","Contacted"],
  ["Steven Sims","","","MS World llc","Kennard MCguire","kmcguire@msworldllc.com","Contacted"],
  ["Jr Singleton","","","NT ATHLETICS","Amir","amir@konicekdillonlaw.com","Contacted"],
  ["Jaxon Smith","","","WME","Joel Segal/Ben Renzin/Geoff Garmhausen","jsegal@wmeagency.com/brenzin@wmeagency.com/ggarmhausen@wmeagency.com","Contacted"],
  ["Olusegun","","","1 of 1 Agency","Andy and Joe","andy@1of1agency.com/Joe@1of1Agency.com","Contacted"],
  ["D´Eryk","","","Apex Sports Group","Matthey Pope","popematthewj@gmail.com","Contacted"],
  ["Boye Mafe","","","Vayner Sports","Mike","mikemac@VaynerSports.com","Contacted"],
  ["Jamie Sheriff","","","Play2 win sports","Markeeth","markeeth@p2wsports.com","Contacted"],
  ["Jarran Reed","","","1 of 1 Agency","Andy Simms","andy@1of1agency.com","Contacted"],
  ["Jacardia Wright","","","Top Line Sports Agency","Ty Schwab","tyschwab10@gmail.com","Contacted"],
  ["Jason myers","","","International Sports Advisors","Brook Henderson","brooks@isafootball.com","Contacted"],
  ["Zach Charbonnet","","","Vayner Sports","Mike and Dave","dave@vaynersports.com/mikemac@VaynerSports.com","Contacted"],
  ["Jake Bobo","","","Wasserman","Steve","steve.caric@teamwass.com","Contacted"],
  ["Nick Kallerup","","","3XL Sports Management","Nate Richman","nrichman@3XLsports.com","Contacted"],
  ["George Holani","","","Disruptive","Henry /Alexander","henry@disruptivesports.com/bigal@disruptivesports.com","Contacted"],
  ["Johnathan Hankins","","","Wasserman","Doug Hendrickson/CJ Laboy/James Barry","dhendrickson@teamwass.com/claboy@teamwass.com/jmbarry@teamwass.com","Contacted"],
  ["Jalen Sundelt","","","One West Sports","Christopher","chrisg@onewestsports.com","Contacted"],
  ["Anthony Bradford","","","AthElite Agency","Neil and Marlon","trey@atheliteagency.com/marlon@atheliteagency.com","Contacted"],
  ["Robbie Ouzt","","","Younger & Associates","Timothy Younger","tmy@youngerassociates.net","Contacted"],
  ["Nick EmmanWorice","","","Athletes First","Trevon & David","stsmith@athletesfirst.net/dmulugheta@athletesfirst.net","Contacted"],
  ["Grey Zabel","","","Excel Sports Management","Chase & Ryan","callahan@excelsm.com/rtollner@excelsm.com","Contacted"],
  ["Jalen Milroe","","","Klutch Sports Group","Nicole Lynn","nlynn@klutchgroup.com","Contacted"],
  ["Brandon Pili","","","Aura sports group","Ness mugrabi/ David canter","ness@aurasmg.com / david@aurasmg.com","Contacted"],
  ["Tariq Woolen","","","Sport Stars","Jason & Evan","Jchayut@sportstarsnyc.com /elippmann@sportstarsnyc.com","Contacted"],
  ["Charles Cross","","","Klutch Sports Group","Kelton /Nicole/Saint","kelton.crenshaw@gmail.com/nlynn@klutchgroup.com/saint@klutchgroup.com","Contacted"],
  ["Bryce Cabeldue","","","Sport Stars","Ron Slavin","rslavin@liftsm.com","Contacted"],
  ["Wesley Steiner","","","Tony Rodgers","Tony Rodger","rogers.tony@hotmail.com","Contacted"],
  ["Brady Rusell","","","United Athlete Sports","Evan & chris","evan@uasports.us / chris@uasports.us","Contacted"],
  ["Malaesala Aumavae","","","Independent sports &entretainment","Roosevelt & Jovan","rbarnes@iseworldwide.com/jbarnes@iseworldwide.com","Contacted"],
  ["Jalan Gaines","","","NA3 Sports","James Durkin","durkin28@aol.com","Contacted"],
  ["Isas Waxter","","","Octagon","Casey Muir","casey.muir@octagon.com","Contacted"],
  ["Byron Murphy","","","Sport Stars","Luke","lukemcmurtrey@gmail.com","Contacted"],
  ["Damien Martniez","","","First Round Management","Malki & Shawn","malki007@aol.com /shawno@firstroundmanagement.com","Contacted"],
  ["Jaylen Waddle","","","GSE Worldwide","Ian Grutman","lgrutman@gseworldwide.com","Contacted"],
  ["De´Von Achane","","","Roc Nation","Leah Knight","lknight@rocnation.com","Contacted"],
  ["Jordyn brooks","","","Roc Nation","Erik Burkhardt","eb@rocnation.com","Contacted"],
  ["Minkah Fitzpatrick","","","Ripple Sports","Bijan Heravi","bijan@ripplesports.com","Contacted"],
  ["Kenneth Grant","","","Ace PR","Alejandra Cristina Ayalde","alejandra@acepr.net","Contacted"],
  ["Darren Waller","","","Rosenhaus Sports Representation","Drew Rosenhaus","dr@rsragency.com","Contacted"],
  ["Liam Eichenberg","","","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
  ["Rasul Douglas","","","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
  ["Jake Bailey","","","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
  ["Caleb Johnson","","","AJAX Sports Agency","Alex Campbell","alex@ajaxsportsagency.com","Contacted"],
  ["Andre Cisco","","","Athletes First","David Mulugheta","dmulugheta@athletesfirst.net","Contacted"],
  ["Irvin Charles","","","Athletes First","Andre Odom","aodom@athletesfirst.net","Contacted"],
  ["Isaiah Davis","","","Wasserman","Michael Swenson","mswenson@teamwass.com","Contacted"],
  ["Gus Hartwig","","","Exclusive Sports Group","Buddy Baker","baker@exclusivesg.com","Contacted"],
  ["Olu Fashanun","","","CAA","Patrick Collins","patrick.collins@caa.com","Contacted"],
  ["Kingsley Jonathan","","","3XL Sports Management","Nate Richman","nrichman@3xlsports.com","Contacted"],
  ["Kiko Mauigoa","","","Younger & Associates","Timothy Younger","tmy@youngerassociates.net","Contacted"],
  ["Jay Tufele","","","Athletes First","Ryan Williams","rwilliams@athletesfirst.net","Contacted"],
  ["Azareye'h Thomas","","","Athletes First","Todd France","tfrance@athletesfirst.net","Contacted"],
  ["Mykal Walker","","","The Sports & Entertainment Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
  ["Aaron Brewer","","","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
  ["Xavier Thomas","","","IFA (The Institute for Athletes)","Blake Baratz","blake@teamifa.com","Contacted"],
  ["Bilal Nichols","","","Wasserman","Doug Hendrickson","dhendrickson@teamwass.com","Contacted"],
  ["Jonah Williams","","","Excel Sports Management","Ryan Tollner","rtollner@excelsm.com","Contacted"],
  ["Travis Vokolek","","","Legend Agency","Pat Capra","Pat@LegendAgency.net","Contacted"],
  ["Josiah Degura","","","Wasserman","Michael Swenson","mswenson@teamwass.com","Contacted"],
  ["Calais Campbell","","","CAA","Tom Condon","thomas.condon@caa.com","Contacted"],
  ["Josh Fryar","","","SportStars","Justin Faires","jfaires3@gmail.com","Contacted"],
  ["Jon Gaines III","","","Steinberg Sports & Entertainment","Cameron Foster","cameron@steinbergsports.com","Contacted"],
  ["Roy Mbeata","","","The Uprise Sports Agency","Jason Beneby","jbeneby@yahoo.com","Contacted"],
  ["Richard gouraige","","","Agency1 Athlete Management Group","Aston Wilson","kaston@astonsportsreps.com","Contacted"],
  ["Rush Reimer","","","Imani Sports","Christopher Murray","chrism@imanisports.com","Contacted"],
  ["Tyrell Shavers","","","Paul DeRousselle","Paul DeRousselle","paul.derousselle@gmail.com","Contacted"],
  ["Connor McGovern","","","WME","Joel Segal","jsegal@wmeagency.com","Contacted"],
  ["Khalil Shakir","","","Equity Sports","Chris Cabott","chris@equity-sports.com","Contacted"],
  ["DaeQuan Hardy","","","SportStars","Brian Mackler","bmackler@sportstarsnyc.com","Contacted"],
  ["Zion Logue","","","Universal Sports & Entertainment Management","Kevin Conner","kconner@universalsportsentertainment.com","Contacted"],
  ["Tylan Grable","","","Grand Central Sports Management","Patrick VanHall","pat@gcsportsmgmt.com","Contacted"],
  ["Josh Palmer","","","The Sports & Entertainment Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
  ["Keleki Latu","","","Wasserman","CJ Laboy","claboy@teamwass.com","Contacted"],
  ["Blen Cleveland","","","Priority Sports & Entertainment","Michael Perrett","michael@prioritysports.biz","Contacted"],
  ["Jake Hummel","","","Wasserman","Steve Caric","steve.caric@teamwass.com","Contacted"],
  ["Diwun Black","","","Octagon","Casey Muir","casey.muir@octagon.com","Contacted"],
  ["Tavius Robinson","","","Wasserman","Steve Caric","steve.caric@teamwass.com","Contacted"],
  ["Charlie Kolar","","","SportStars","Brian Mackler","bmackler@sportstarsnyc.com","Contacted"],
  ["Bilhal Kone","","","Roc Nation","Kim Miale","km@rocnation.com","Contacted"],
  ["Ronnie Stanley","","","Athletes First","Brian Murphy","bmurphy@athletesfirst.net","Contacted"],
  ["Daniel Faalele","","","Elite One Sports Management","Reginald Johnson","reggie23125@yahoo.com","Contacted"],
  ["Mike Green","","","Klutch Sports Group","Damarius Bilbo","dbilbo@klutchgroup.com","Contacted"],
  ["Malaki Stark","","","Turner Sports Management","Joel Turner","sturnersportsinc@aol.com","Contacted"],
  ["Lucas Patrick","","","Rosenhaus Sports Representation","Drew Rosenhaus","dr@rsragency.com","Contacted"],
  ["Marco Wilson","","","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
  ["Isaiah Williams","","","VaynerSports","Mike McCartney","mikemac@vaynersports.com","Contacted"],
  ["Payton Thorne","","","National Sports Agency","Harold Lewis","haroldclewis@cs.com","Contacted"],
  ["Trey Hendrickson","","","Believe Sports Group","Chris Overton","overtonc3@gmail.com","Contacted"],
  ["Jamoi Mayes","","","JB Sports","Jack Bechta","jack@nfladvisor.com","Contacted"],
  ["Geno Stone","","","Elite Loyalty Sports","Vincent Taylor","VTaylor@elsportsinc.com","Contacted"],
  ["Josh Newton","","","The Familie","Erik Schmella","eschmella@thefamilie.com","Contacted"],
  ["Kole Taylor","","","Athletes First","Andrew Kessler","AKessler@AthletesFirst.Net","Contacted"],
  ["Daxton Hill","","","Excel Sports Management","Max Lipsett","mlipsett@excelsm.com","Contacted"],
  ["Keaton Wallace","","","Klutch Sports Group","Shayaun Saee","ssaee@klutchgroup.com","Contacted"],
  ["N'Faly Dante","","","ProMondo Sports","Matt Bollero","matt@promondosports.com","Contacted"],
  ["Hugo Gonzalez","","","Equity Sports","Brandon Grier","brandon@equitybasketball.com","Contacted"],
  ["Miles Norris","","","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
  ["Terance Mann","","","Klutch Sports Group","Anthony Fields","fields@klutchgroup.com","Contacted"],
  ["Keon Johnson","","","UNLTD Sports Group","Nick Blatchford","nick@unltdsports.com","Contacted"],
  ["Tyrese Martin","","","Priority Sports & Entertainment","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
  ["Kon Knueppel","","","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Daquan Jeffries","","","Excel Sports Management","Michael Tellem","mtellem@excelsm.com","Contacted"],
  ["Matas Buzelis","","","CAA","Austin Brown","austin.brown@caa.com","Contacted"],
  ["Jaden Ivey","","","Excel Sports Management","Jeff Schwartz","jeff@excelsm.com","Contacted"],
  ["Isaac Okoro","","","Klutch Sports Group","Shayaun Saee","ssaee@klutchgroup.com","Contacted"],
  ["Emanuel Miller","","","Charles Tucker Services","Charles Tucker","tuckersportsagency@gmail.com","Contacted"],
  ["Emoni Bates","","","Verus Management Team","Aaron Turner","aturner@verusteam.com","Contacted"],
  ["Nae'Qwan Tomlin","","","Priority Sports & Entertainment","Kieran Piller","kieranp@prioritysports.biz","Contacted"],
  ["Max Strus","","","Verus Management Team","Aaron Turner","aturner@verusteam.com","Contacted"],
  ["Miles Kelly","","","A11Even Sports Management","Shetellia Riley","shetellia@aol.com","Contacted"],
  ["Kyrie Irving","","","LIFT Sports Management","Yann Balikouzou","yb@liftsm.com","Contacted"],
  ["Moussa Cisse","","","ADS Sports Management","Adam Godes","adamlgodes@gmail.com","Contacted"],
  ["Spencer Jones","","","Wasserman","Darren Matsubara","dmatsubara@teamwass.com","Contacted"],
  ["Julian Strawther","","","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Christian Braun","","","Excel Sports Management","Jared Mucha","jmucha@excelsm.com","Contacted"],
  ["Dario Saric","","","Glushon Sports Management","Jason Glushon","jg@glushonsm.com","Contacted"],
  ["Duncan Robinson","","","Priority Sports & Entertainment","Mark Bartelstein","mbart13@prioritysports.biz","Contacted"],
  ["Ron Holland","","","Priority Sports & Entertainment","George Roussakis","georger@prioritysports.biz","Contacted"],
  ["Pat Spencer","","","A11 Sports Management","Aylton Tesch","tesch@a11sm.com","Contacted"],
  ["Quinten Post","","","Excel Sports Management","Sean Kennedy","sean@excelsm.com","Contacted"],
  ["Gui Santos","","","Wasserman","Chafie Fields","cfields@teamwass.com","Contacted"],
  ["Alperen Sengun","","","Life Sports Agency","Jaafar Choufani","jaafar@lifesportsagency.com","Contacted"],
  ["Steven Adams","","","Siegel Sports & Entertainment","Michael Siegel","info@sseagency.com","Contacted"],
  ["Tari Eason","","","WME","Bill Duffy","duff@bdasports.com","Contacted"],
  ["Andrew Nembhard","","","Wasserman","Ted Yeschin","tyeschin@teamwass.com","Contacted"],
  ["Jay Huff","","","LIFT Sports Management","Kevin Bradbury","kbradbury@liftsm.com","Contacted"],
  ["TyTy Washington Jr","","","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
  ["Nicolas Batum","","","Klutch Sports Group","Calvin Andrews","candrews@klutchgroup.com","Contacted"],
  ["Christian Koloko","","","Glushon Sports Management","Jason Glushon","jg@glushonsm.com","Contacted"],
  ["RJ Davis","","","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
  ["Santi Aldama","","","Lenox Partners","Greer Love","glove@lenox-partners.com","Contacted"],
  ["Lamar Stevens","","","CAA","Aaron Mintz","aaron.mintz@caa.com","Contacted"],
  ["Jaime Jaquez Jr","","","Glushon Sports Management","Jason Glushon","jg@glushonsm.com","Contacted"],
  ["Norman Powell","","","AMR Agency LLC","Aaron Reilly","aaron@amragencyllc.com","Contacted"],
  ["Dru Smith","","","Octagon","Alex Saratsis","alexandros.saratsis@octagon.com","Contacted"],
  ["Thanasis Antetokounmpo","","","Jacques & Associates PLLC","Jennifer Jacques","jjacques@jacqueslawfirm.com","Contacted"],
  ["AJ Green","","","Wasserman","Joe Smith","jsmith@teamwass.com","Contacted"],
  ["Jesse Edwards","","","Comsport","Bouna N'diaye","bouna@comsport.biz","Contacted"],
  ["Rudy Gobert","","","You First Sports","Darrell Comer Jr.","dcomer@csetalentrep.com","Contacted"],
  ["Elfrid Payton","","","Dynasty Sports Management","Mayar Zokaei","mzokaei@gmail.com","Contacted"],
  ["Kylor Kelley","","","Wasserman","Jelani Floyd","jelani.floyd@teamwass.com","Contacted"],
  ["Yves Missi","","","Wasserman","Ted Yeschin","tyeschin@teamwass.com","Contacted"],
  ["Delon Wright","","","QC Sports","Derrick Powell","deepowell@qcsports.com","Contacted"],
  ["Trey Jemison","","","Roc Nation","Sam Permut","sam@rocnation.com","Contacted"],
  ["Dillon Jones","","","Kam Sports Group","Mathieu Curadeau","groupekamsports@gmail.com","Contacted"],
  ["Nathan Legare","","","CAA","Pat Brisson","pbrisson@caa.com","Contacted"],
  ["Thomas Bordeleau","","","Alterno Global Management","Peter Wallen","peter.wallen@alternomgt.com","Contacted"],
  ["Isac Lundestrom","","","Wasserman","Kurt Overhardt","koverhardt@kosportsinc.com","Contacted"],
  ["Cutter Gauthier","","","Gold Star Hockey","Daniel Milstein","dmilstein@goldstarhockey.com","Contacted"],
  ["Pavel Mintyukov","","","Sports Professional Management Inc.","Lewis Gross","lewisgross@yahoo.com","Contacted"],
  ["Jeremy Swayman","","","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
  ["Mason Lohrei","","","Gold Star Hockey","Daniel Milstein","dmilstein@goldstarhockey.com","Contacted"],
  ["Nikita Zadorov","","","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
  ["Jordan Greenway","","","Newport Sports Management Inc.","Craig Oster","coster@thehockeyagency.com","Contacted"],
  ["Josh Norris","","","4sports Hockey","Claude Lemieux","lemieux@4sportsworld.com","Contacted"],
  ["Rasmus Andersson","","","Wasserman","David Gagner","dgagner@teamwass.com","Contacted"],
  ["Joel Farabee","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Khabib Nurmagomedov","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Kamaru Usman","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Justin Gaethje","","","Dominance MMA","Ali Abdelaziz","info@dominancemma.com","Contacted"],
  ["Henry Cejudo","","","Paradigm Sports Management","Audie Attar","audie@paradigmsports.com","Contacted"],
  ["Conor McGregor","","","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Jon Jones","","","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Ilia Topuria","","","First Round Management","Malki Kawa","info@firstroundmanagement.com","Contacted"],
  ["Derrick Lewis","","","First Round Management","Abe Kawa","ops@firstroundmanagement.com","Contacted"],
  ["Dominick Cruz","","","First Round Management","Abe Kawa","ops@firstroundmanagement.com","Contacted"],
  ["Andrei Arlovski","","","First Round Management","Lukasz Orzel","info@firstroundmanagement.com","Contacted"],
  ["Klaudia Sygula","","","First Round Management","Lukasz Orzel","info@firstroundmanagement.com","Contacted"],
  ["Mateusz Rebecki","","","First Round Management","John Song","info@firstroundmanagement.com","Contacted"],
  ["Seok Hyeon Ko","","","First Round Management","John Song","info@firstroundmanagement.com","Contacted"],
  ["Rinya Nakamura","","","First Round Management","Jose Diaz","info@firstroundmanagement.com","Contacted"],
  ["Alex Caceres","","","First Round Management","AJ Ariosa","info@firstroundmanagement.com","Contacted"],
  ["Bryce Mitchell","","","First Round Management","Mason Kemp","info@firstroundmanagement.com","Contacted"],
  ["Lauren Murphy","","","First Round Management","Ray Hoerner","info@firstroundmanagement.com","Contacted"],
  ["Jalin Turner","","","Iridium Sports Agency","Jason House","info@firstroundmanagement.com","Contacted"],
  ["Cody Brundage","","","Intensity FM Management","Kalle Sauerland","thebaddy@intensitifm.com","Contacted"],
  ["Paddy Pimblett","","","Saga Sports","Bill Neff","sagasp@aol.co","Contacted"],
  ["Gabe Vincent","","","Sports International Group","Sammy Wloszczowski","sammyw@sigsports.com","Contacted"],
  ["Jock Landale","","","The Familie","David Bauman","info@thefamilie.com","Contacted"],
  ["Garrison Mathews","","","Excel Sports Management","Jordan Gertler","jgertler@excelsm.com","Contacted"],
  ["Onyeka Okongwu","","","Icona Agency","Diana Day","diana@iconaagency.com","Contacted"],
  ["Buddy Hield","","","Edge Sports International","Sam Cipriano","cipriano@edgesportsintl.com","Contacted"],
  ["Micah Potter","","","GSL Sports Group","George Langberg","gsl@gslsportsgroup.com","Contacted"],
  ["Ben Sheppard","","","Excel Sports Management","Mike Lindeman","mike@excelsm.com","Contacted"],
  ["Aaron Nesmith","","","The Familie","David Bauman","info@thefamilie.com","Contacted"],
  ["Reece Beekman","","","Hazan Sports Management Group","Daniel Hazan","daniel@hazansports.com","Contacted"],
  ["Trevelin Queen","","","Prolifiq Sports Group","Tony Miranda","tmiranda@prolifichq.com","Contacted"],
  ["Jonathan Isaac","","","Rize Management","Scott Nichols","snichols@rizemanagement.com","Contacted"],
  ["Lester Quinones","","","Up Tempo Management","David Putterie","info@uptempomanagement.com","Contacted"],
  ["Toumani Camara","","","Assist Sports","Eric Fleisher","fleisher@assistsports.co","Contacted"],
  ["Stanley Umude","","","LIFT Sports Management","Mike Miller","mm@liftsm.com","Contacted"],
  ["Wendell Moore Jr.","","","You First Sports","Deirunas Visockas","deirunas.visockas@youfirstsports.com","Contacted"],
  ["Chaz Lanier","","","Octagon","Ron Shade","ron.shade@octagon.com","Contacted"],
  ["Paul Reed","","","Next Sports Agency","Adam Papas","adampapas.nextsports@gmail.com","Contacted"],
  ["Dean Wade","","","Always On Player Representation Services","Ryan Straining","ryan@alwaysonprs.com","Contacted"],
  ["Craig Porter Jr.","","","EZ Sports Group","Corey Marcum","info@ezsportsgroup.com","Contacted"],
  ["Keon Ellis","","","Goodwin Sports Management","Aaron Goodwin","agood7@goodwinsports.com","Contacted"],
  ["GG Jackson II","","","Famo Sports","Donnell","Dnell38@yahoo.com","Contacted"],
  ["Josh Giddey","","","Lighthouse Sports Management","Daniel","daniel@lighthousesportsmgmt.com","Contacted"],
  ["Marco Rossi","","","The Will Sports Group","Ian","ian@willsportsgroup.com","Contacted"],
  ["Seth Jarvis","","","The Sports Corporation","Gerry","gjohannson@tschockey.com","Contacted"],
  ["Jackson Merrill","","","KHG Sports Management","Josh","Josh@khgsports.com","Contacted"],
  ["Paul Skenes","","","Independent Sports & Entertainment","Mark","mpieper@iseworldwide.com","Contacted"],
  ["Michael Harris II","","","Munger English Sports Management","Clarence","clarence@mungerenglish.com","Contacted"],
  ["Amen Thompson","","","G.A.P.P. Sports Group","Troy","maatausar@gmail.com","Contacted"],
  ["Leo Carlsson","","","WIN Hockey Agency","Matt","mkeator@winhockeyagency.com","Contacted"],
  ["Gunnar Henderson","","","The Boras Corporation","Scott","sb1@borascorp.com","Contacted"],
  ["Junior Caminero","","","Republik Sports","Rafa","rafa@gorepublik.com","Contacted"],
  ["Zach Benson","","","R.W.G. Sport Management","Ross","ross@rwgsportmanagement.com","Contacted"],
  ["James Harden","","","Equity Sports","Brandon Grier","brandon@equitybasketball.com","Contacted"],
  ["Brandon Miller","","","VaynerSports","AJ","aj@vaynersports.com","Contacted"],
  ["Brandt Clarke","","","Edge Sports Management","Randy","randy@edgesportsmanagement.com","Contacted"],
  ["William Eklund","","","International Sports Advisors Co.","Todd","tjd@isaprosports.com","Contacted"],
  ["Zach Neto","","","EnterSports Management","Gavin","gavin@enter-sports.com","Contacted"],
  ["Ceddanne Rafael","","","MVP Sports Group","Dan","dannyl@mvpsportsgroup.com","Contacted"],
  ["Brooks Lee","","","Apex Baseball","Adam","adamk@apexbaseball.com","Contacted"],
  ["Roman Anthony","","","Frontline Athlete Management","Matt","matt@frontlineam.com","Contacted"],
  ["Jackson Chourio","","","Beverly Hills Sports Council","Cesar","csuarez@bhscglobal.com","Contacted"],
  ["Lane Hutson","","","Quartexx Management","Sean Coffey","sean@quartexxmanagement.com","Contacted"],
  ["Dylan Guenther","","","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
  ["Francisco Alvarez","","","Rimas Sports","Sharon Rodriguez","srodriguez@rimassports.com","Contacted"],
  ["Zach Hyman","","","Raze Sports","Todd Reynolds","toddr@razesports.com","Contacted"],
  ["Lukas Reichel","","","RSG Hockey LLC","Allain Roy","allain@rsghockey.com","Contacted"],
  ["Seamus Casey","","","OCTANE Sports Management","Eddie Mio","eddie@octanesports.com","Contacted"],
  ["Kevin Gausman","","","Tidal Sports Group","Brodie Scoffield","bscoffield@tidalsportsgroup.com","Contacted"],
  ["Robbie Rayn","","","VC Sports Group","Steve Veltman","sveltman@vcsportsgroup.com","Contacted"],
  ["Bennedict Mathuring","","","Innovate Sports Group","Nima Namakian","namakian@innovatesportsgroup.com","Contacted"],
  ["Ryan Poehling","","","O2K Sports Management","Dean Grillo","grillo@o2kmanagement.com","Contacted"],
  ["Mavrik Bourque","","","Meridian Hockey","Dominic DeBlois","dominic@meridianhockey.com","Contacted"],
  ["Joel Armia","","","MPR Hockey","Mika Rautakallio","mika@mprhockey.com","Contacted"],
  ["Jaden Springer","","","A3 Athletics","Isaac Conner","ike@replegacy.com","Contacted"],
  ["Kris Dunn","","","Thread Sports Management","Bernie Lee","bernie@threadsm.com","Contacted"],
  ["Nino Niederreiter","","","Rufener Hockey LLC","Andre Rufener","andre@rufenerhockey.com","Contacted"],
  ["Mike Hardman","","","Buckley Sports Management","Jerry Buckley","jerry@buckleysports.com","Contacted"],
  ["Miles Wood","","","Global Hockey Consultants","Peter Fish","pfish@globalhockey.net","Contacted"],
  ["Dustin May","","","Cadence 158","Bill Sanders","bill@cadence158.com","Contacted"],
  ["Kyle Isbel","","","Paragon Sports International","Garrett Parcell","garrett@paragonsports.net","Contacted"],
  ["Nate Eaton","","","Gaeta Sports Management","Matthew Gaeta","mg@gaetasportsmgt.com","Contacted"],
  ["Ladd McConkey","","","Everett Sports Marketing (ESM)","Jeff Hoffman","jeff@thisisesm.com","Contacted"],
  ["Keon Coleman","","","Just Win Management Group","Joe Hernandez","joe@justwin.us","Contacted"],
  ["Ja'Marr Chase","","","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
  ["Tee Higgins","","","Alliance Sports","Caitlin Aoki","caitlin@alliance-sports.com","Contacted"],
  ["Brock Purdy","","","Range Media Partners","Kyle Strongin","kstrongin@rangemp.com","Contacted"],
  ["Travis Kelce","","","Milk & Honey Sports","Jacob Presser","jmpresser@gmail.com","Contacted"],
  ["Saquon Barkley","","","LBI Entertainment","Ken Katz","kk@lbient.com","Contacted"],
  ["Bo Nix","","","QB Reps","Peter Webb","peter@qbreps.com","Contacted"],
  ["Caleb Williams","","","Barnburner Sports Marketing","AJ Romeo","aromeo@barnburnermktg.com","Contacted"],
  ["Jayden Daniels","","","EAG Sports Management","Denise White","denise.white@eagsportmanagement.com","Contacted"],
  ["Mike Evans","","","Day 1 Sports & Entertainment","Deryk Gilmore","deryk.g@day1sports.com","Contacted"],
  ["Terry McLaurin","","","The Society Management","Bronson Sanich","bronson@thesociety.us","Contacted"],
  ["Cooper Kupp","","","Royalty Management Group","Tzvi Grossman","tgrossman@royaltymanagementgoup.com","Contacted"],
  ["Marvin Harrison Jr.","","","Harrison Incorporated","Marvin Harrison Jr.","mhj@harrisonincorporated.com","Contacted"],
  ["Lamar Jackson","","","Synergy Sports International LLC","Josh Arnold","josh@synergysportsonline.com","Contacted"],
  ["Patrick Mahomes","","","1UP Sports Marketing","Jacquelyn Dahl","jd@1upsportsmarketing.com","Contacted"],
  ["Alvin Kamara","","","DR31 Sports","David Raymond","david@dr31sports.com","Contacted"],
  ["Joe Mixon","","","Authentic Athletix","Peter Schaffer","peter@agentaa.com","Contacted"],
  ["Zay Flowers","","","WIN Sports Group","Patrick Whitesell","contact@winsg.com","Contacted"],
  ["Anthony Richardson","","","Legacy Sports Advisors","Deiric Jackson","deiricjackson@gmail.com","Contacted"],
  ["Rhamondre Stevenson","","","SIEGE","Brian Hannula","brian@siegerep.com","Contacted"],
  ["Stefon Diggs","","","SMAC Entertainment","Constance Schwartz-Morini","cs@smac-ent.com","Contacted"],
  ["Chris Jones","","","Katz Brothers Sports","Jason Katz","jason@katzbrotherssports.com","Contacted"],
  ["Diontae Johnson","","","QC Sports","Bradley Cicala","brad@qcsports.com","Contacted"],
  ["George Kittle","","","JB Sports","Jack Bechta","jack@nfladvisor.com","Contacted"],
  ["Malik Nabers","","","CMV Sports LLC","Damien Butler","damien.butler@cmvsports.com","Contacted"],
  ["Isiah Pacheco","","","Neil S Schwartz Associates Inc","Neil S. Schwartz","neil@sffootball.net","Contacted"],
  ["Josh Jacobs","","","Black Label Sports Group LLC","Chad Wiestling","wiestling@blacklabelsportsgroup.com","Contacted"],
  ["Davante Adams","","","Sun West Sports","Frank Bauer","Sws9922@aol.com","Contacted"],
  ["Tony Pollard","","","MS World LLC","Kennard McGuire","kmcguire@msworldllc.com","Contacted"],
  ["Desmond Bane","","","Gersh","Maxwell Wiepking","mwiepking@gersh.com","Contacted"],
  ["Deni Avdija","","","2Talent Sports Management","Matan Siman-Tov","matan@2talent.co.il","Contacted"],
  ["Mouhamed Gueye","","","PNW Sports Group","Amandeep Dhesi","adhesi@pnwsportsgroup.com","Contacted"],
  ["Kristaps Porzingis","","","FUTURE Sports Group","Janis Porzingis","porzingis@hotmail.com","Contacted"],
  ["Moussa Diabate","","","BC Sports","Nodirbek Talipov","nodirbek@hotmail.com","Contacted"],
  ["Pelle Larsson","","","WEAVE","Daniel Poneman","danielponeman@gmail.com","Contacted"],
  ["Mohamed Diawara","","","Maz Sport Agency","Olivier Mazet","mazet@mazsportagency.com","Contacted"],
  ["Jack McVeigh","","","Mogul Sports Group","Marquis Taylor","mtaylor@mogulsportsgroup.com","Contacted"],
  ["Jabari Smith Jr.","","","Prather Sports","Wallace Prather","wallaceprather@gmail.com","Contacted"],
  ["Tolu Smith","","","EZ Sports Group","Corey Marcum","info@ezsportsgroup.com","Contacted"],
  ["AJ Green","","","Jacques & Associates PLLC","Jennifer Jacques","jjacques@jacqueslawfirm.com","Contacted"],
  ["Stanley Umude","","","Assist Sports","Eric Fleisher","fleisher@assistsports.co","Contacted"],
  ["Riley Minix","","","Arete Sports Agency","Andre Buck","abuck@aretesportsagency.com","Contacted"],
  ["Jordan Walsh","","","On Time Agency","Ramon Sessions","ramon@ontimeagencygroup.com","Contacted"],
  ["Hayden Gray","","","Duran International Sports Management","Emilio Duran","eduran@duraninternational.com","Contacted"],
  ["Quenton Jackson","","","Young Money APAA Sports","Adie von Gontard","adie@ymapaasports.com","Contacted"],
  ["RayJ Dennis","","","LAMF Sports Management","Daniel Curtin","daniellcurtin@gmail.com","Contacted"],
  ["Damion Baugh","","","HCS Sports Agency","Marcus Maples","marcus@hcsportsagency.com","Contacted"],
  ["Kenrich Williams","","","Pensack Sports","Adam Pensack","adam@pensacksports.com","Contacted"],
  ["Jaylen Martin","","","Valor Sports Agency","Deddrick Faison","dfaison@valorsportsagency.com","Contacted"],
  ["Dante Exum","","","The Landmark Sports Agency","Brandon Rosenthal","bmr@landmarksports.com","Contacted"],
  ["EJ Harkless","","","RBA Sports","Brian Bass","bjb@rbasports.com","Contacted"],
  ["Kylor Kelley","","","Dynasty Sports Management","Mayar Zokaei","mzokaei@gmail.com","Contacted"],
  ["Garrison Brooks","","","CSE","Darrell Comer Jr.","dcomer@csetalentrep.com","Contacted"],
  ["Karlo Matkovic","","","Beo Basket","Misko Raznatovic","misko4@beobasket.net","Contacted"],
  ["Nate Williams","","","Family of Athletes","Billy Davis","bdavis@foasports.com","Contacted"],
  ["Riley Minix","","","Project B Sports & Entertainment","Brandon Wood","bwood@projectbsports.com","Contacted"],
  ["Lawson Lovering","","","One Motive Sports","Andrew Kelso","andrew@onemotivesports.com","Contacted"],
  ["Ben Sims","","","The Familie","Jack Scharf","jscharf@thefamilie.com","Contacted"],
  ["Garrison Mathews","","","The Sports Law Group","Chris Patrick","cpatrick@thesportslawgroup.com","Contacted"],
  ["Ketel Marte","","","QC Sports","Alex Cotto","alex@qcsports.com","Contacted"],
  ["Austin Riley","","","SportsMeter","David Meter","dmeter@aol.com","Contacted"],
  ["Ozzie Albies","","","PSI Sports Management","David","david@psisports.com","Contacted"],
  ["Aaron Judge","","","The Bledsoe Agency","Hunter Bledsoe","hunter@bledsoeagency.com","Contacted"],
  ["Brendan Donovan","","","Ballengee Group","Henri Stanley","HStanley@ballengeegroup.com","Contacted"],
  ["Victor Scott II","","","ACES","Sam Levinson","sam@acesinc1.com","Contacted"],
  ["Logan Webb","","","Nova Sports Agency","Gavin","gavin@enter-sports.com","Contacted"],
  ["Emmanuel Clase","","","Lakeridge Sports Management","Derek Marques","info@lakeridgesportsmgmt.com","Contacted"],
  ["Dane Myers","","","Northwest Sports Management Group","Nik","nik@nwsportsmanagementgroup.com","Contacted"],
  ["Zach McKinstry","","","Z-Axis Sports","J. Zapata","Jzapata@zaxissports.com","Contacted"],
  ["Johan Rojas","","","Weisz Sports Management","Jonathan Weisz","jonathan.weisz@weiszsports.com","Contacted"],
  ["Tommy Edman","","","Prime Sports Management","Tommy Barbella","tbarbella@primesportsagency.com","Contacted"],
  ["Andy Pages","","","Meister Sports Management","Barry Meister","barry@meistersports.com","Contacted"],
  ["Chris Taylor","","","McKinnis Sports Management","Bo McKinnis","mckinnissports@comcast.net","Contacted"],
  ["Sonny Gray","","","Icon Sports Management","Robert Martin","rmartin@teamicon.net","Contacted"],
  ["Andrew Heaney","","","North Star Sports Management","Tony Giordano","tony@northstarsportsmgmt.com","Contacted"],
  ["Brett Wisely","","","Warner Sports Management","Erik Johnson","ejohnson@warnersportsmanagement.com","Contacted"],
  ["Jason Adam","","","Jack Toffey Sports Management","Jack Toffey","jacktoffey@comcast.net","Contacted"],
  ["Aaron Civale","","","EnterSports Management","Gavin Kahn","gavin@enter-sports.com","Contacted"],
  ["Will Warren","","","Ball Players Agency","Storm Kirschenbaum","storm@ballplayersagency.com","Contacted"],
  ["Austin Wynn","","","BBI Sports Group","Ryan Cliff","jay.franklin@bbisportsgroup.com","Contacted"],
  ["Cade Cavalli","","","John Boggs & Associates","John Boggs","jboggs@jbasports.com","Contacted"],
  ["Trevor Williams","","","Premier Talent Sports & Entertainment","Paul Kinzer","paul@ptsemgmt.com","Contacted"],
  ["Jeimer Candelario","","","Moye Sports","J. Ware","jware@moyesports.com","Contacted"],
  ["Alex Call","","","Alliance Sports Management","Ryan Ware","rware@alliance-sm.com","Contacted"],
  ["Jeffrey Springs","","","mherzog@yahoo.de","Karl","tom@toconnellsports.com","Contacted"],
  ["Tim Leibold","","","Red Envelope Sports","Carter Chow","carter@redenvelopesports.com","Contacted"],
  ["David Onyemat","","","Sports Law and Management (SLAM)","Michael Hoffman","michael@slam.la","Contacted"],
  ["DeAngelo Malone","","","Agency 1 Athlete Management Group","Ron Butler","ronbutler@amg1sports.com","Contacted"],
  ["Phillip Dorsett","","","Turner Sports Management","Joel Turner","sturnersportsinc@aol.com","Contacted"],
  ["Lucas Patrick","","","National Sports Agency","Harold lewis","haroldclewis@cs.com","Contacted"],
  ["Isaiah Williams","","","Shark Sports Management","James Grogan","jimgrogan14@gmail.com","Contacted"],
  ["Drew Sample","","","SportStars","Brian Mackler","bmackler@sportstarsnyc.com","Contacted"],
  ["Taven Bryan","","","US Sports Inc","Robert Walker","rw@ussportsmanagement.com","Contacted"],
  ["Emanuel Wilson","","","JB Sports","Christopher Hays","haysr99@gmail.com","Contacted"],
  ["Kristian Welch","","","Leverage Football","Mark Henness","mark@leveragefootball.com","Contacted"],
  ["Warren Brinson","","","The Familie","Tyler Thomas","eschmella@thefamilie.com","Contacted"],
  ["A.J. Cole","","","United Sports Group","Brian Overstreet","brian@unitedsportsgroup.com","Contacted"],
  ["Tristin McCollum","","","1st Down Sports","Mark Bailey","mark.bailey@1stdownsports.com","Contacted"],
  ["Jeff Foreman","","","The Sports & Entertainment Group","Jeffrey Whitney","jeff@tsegllc.com","Contacted"],
  ["Jordan Meredith","","","Upper Edge Management","Andy Ross","andy@upperedgesports.com","Contacted"],
  ["Morgan Moses","","","ProStar Sports Agency","Paul Sheehy","paul@prostarsportsagency.com","Contacted"],
  ["Brandon Crossley","","","IV Life Management","Frank Miranda","frank@fcmlaw.com","Contacted"],
  ["Cam Riley","","","Delta Sports Group","Jesse Foreman","thenflagent@gmail.com","Contacted"],
  ["Isaiah Iton","","","1 of 1 Agency","Andy Simms","andy@1of1agency.com","Contacted"],
  ["Kyle Dugger","","","Pyramid Sports Group","Orlando Arnold","orlando@pyramidsportsgroup.com","Contacted"],
  ["D'Shawn Jamison","","","DEAL","Kevin Poston","kposton@thedealllc.com","Contacted"],
  ["Evan Hull","","","One West Sports Group","Christopher Gittings","chrisg@onewestsports.com","Contacted"],
  ["Ale Kaho","","","AFC Sports Worldwide","Arc Tolentino","arctolentinosports@gmail.com","Contacted"],
  ["Jordan Magee","","","Clarity Sports International","Jason Bernstein","jason@clarityfootball.com","Contacted"],
  ["Rob McDaniel","","","Lady Lib Sports & Entertainment","Rasheeda Liberty","rasheeda@ladylib.com","Contacted"],
  ["Car'lin Vigers","","","Paul DeRousselle","Paul DeRousselle","paul.derousselle@gmail.com","Contacted"],
  ["Jaylin Lane","","","Grady Sports Agency","Joshua Grady","joshua@gradysports.com","Contacted"],
  ["Jacoby Jones","","","Forever Athlete Management","Damian Knight","d.knight@foreverathletemanagement.com","Contacted"],
  ["Chukwuebuka Godrick","","","The Uprise Sports Agency","Jason beneby","jbeneby@yahoo.com","Contacted"],
  ["Patrick Mahomes","","","1UP Sports Marketing","Chris Cabott","jd@1upsportsmarketing.com","Contacted"],
  ["Jahmal Banks","","","Generation Sports Group","Christian Kranz","christian@generationsportsgroup.com","Contacted"],
  ["Keaton Mitchell","","","Elite One Sports Management","Reginald Johnson","reggie23125@yahoo.com","Contacted"],
  ["T.J. Tampa","","","Overtime Sports Management Group","Corey Williams","coreyden@yahoo.com","Contacted"],
  ["JB Brown","","","Day 1 Sports & Entertainment","Deryk Gilmore","deryk.g@day1sports.com","Contacted"],
  ["Ja'Quan McMillian","","","McRae Sports Group","Demarius McRae","dmcrae3@hotmail.com","Contacted"],
  ["K.J. Cloyd","","","Milk & Honey Sports","Rawleigh Williams","rawleighW22@gmail.com","Contacted"],
  ["Nash Jones","","","Optimal Sports Management","Rick Martin","christophergil@optimalsports.net","Contacted"],
  ["Myles Purchase","","","KMM Sports","Stefphon Jefferson","stefphon@kmmsports.com","Contacted"],
  ["Emany Johnson","","","Diamond Sports & Talent Management","Jesse LeGrande","jesse.legrande@diamondsportsmanagement.com","Contacted"],
  ["TeRah Edwards","","","3XL Sports Management","Nate Richman","nrichman@3XLsports.com","Contacted"],
  ["Darius Cooper","","","A3 Athletics","Chad Speck","ike@replegacy.com","Contacted"],
  ["Nakobe Dean","","","Be The Best Sports Group","Chris Ellison","EllisonChris04@gmail.com","Contacted"],
  ["Giles Jackson","","","IFA - The Institute for Athletes","Blake Baratz","blake@teamifa.com","Contacted"],
  ["Xavier Thomas","","","Smart Sports","Brandon Smart","smartconsultingagency@gmail.com","Contacted"],
  ["Royce Newman","","","Plan B Sports Management","Brian Hamilton","planbsports@yahoo.com","Contacted"],
  ["Starling Thomas V","","","Universal Sports & Entertainment Management","Kevin Conner","kconner@universalsportsentertainment.com","Contacted"],
  ["Zion Logue","","","Vantage Management Group","Nathaniel Thomas","ntthomas@vantagesports.ca","Contacted"],
  ["Paris Shand","","","Everett Sports Marketing (ESM)","Jeff Crandall","jeff@thisisesm.com","Contacted"],
  ["Jonathan Allen","","","Kutak Rock LLP","James Carroll","jr.carroll@kutakrock.com","Contacted"],
  ["Dwight McGlothern","","","Advantage One Group","Tayo Adewon","tadewon@a1advantagegroup.com","Contacted"],
  ["Myles Price","","","Quintessentially Sports","Dwayne Treece","clientservices@nicodemusltd.com","Contacted"],
  ["Elijah Williams","","","Colture Sports Agency","Tyrome Baisden","ty@colturesports.com","Contacted"],
  ["Mishael Powell","","","CMV Sports LLC","Damien Butler","damien.butler@cmvsports.com","Contacted"],
  ["Ja'Quinden Jackson","","","Alliance Sports","Rocky Arceneaux","rocky@alliance-sports.com","Contacted"],
  ["Antonio Johnson","","","All Pro Sports & Entertainment","Lamont Smith","clsmith@apse.net","Contacted"],
  ["Dorian Singer","","","Elite Loyalty Sports","Vincent Taylor","VTaylor@elsportsinc.com","Contacted"],
  ["Travon Walker","","","OTG Sports","James Martin","cmartin@otgsports.com","Contacted"],
  ["Shakel Brown","","","Prolifiq Sports Group","Kaveh Akbari","Kaveh@greyshot.co","Contacted"],
  ["Kevin Givens","","","First Round Management","Malki Kawa","malki007@aol.com","Contacted"],
  ["Israel Abanikanda","","","Puck Agency, LLC","Bobby Gauthier","abgauthier@otsportsgroup.com","Contacted"],
  ["Nick Abruzzese","","","Gold Star Hockey","Daniel Milstein","edmilstein@goldstarhockey.com","Contacted"],
  ["Artur Akhtyamov","","","Achieve Sports Management","Justin Duberman","jduberman@gmail.com","Contacted"],
  ["Matt Benning","","","Eclipse Sports Management","Michael Deutsch","mike@esmhockey.com","Contacted"],
  ["Pontus Holmberg","","","Bartlett Hockey","Brian Bartlett","brian@bartletthockey.com","Contacted"],
  ["Jake McCabe","","","Titan Sports Management","Kevin Epp","kepp@titan365.com","Contacted"],
  ["Oliver Ekman-Larsson","","","Quartexx Management","Darren Ferris","darren@quartexxmanagement.com","Contacted"],
  ["Mitch Marner","","","Buckley Sports Management","Jerry Buckley","jerry@buckleysports.com","Contacted"],
  ["Jacob Quillan","","","Newport Sports Management Inc.","Craig Oster","coster@thehockeyagency.com","Contacted"],
  ["Dennis Hildeby","","","RSG Hockey, LLC","Allain Roy","allain@rsghockey.com","Contacted"],
  ["Joseph Woll","","","Cover-0","George Holley","george.cover0@gmail.com","Contacted"],
  ["Jatravis Broughton","","","Young Money APAA Sports","Peter von Gontard","peter@ymapaasports.com","Contacted"],
  ["Ja'Tyre Carter","","","BC Sports","Bus Cook","bus@b-c-sports.com","Contacted"],
  ["Marcedes Lewis","","","Maven Sports Group","Darren Jones","drjsports@gmail.com","Contacted"],
  ["Gage Larvadain","","","AMDG Sports","Jonathan Feinsod","jfeinsod@amdgsports.com","Contacted"],
  ["Jason Ivey","","","SES Sports","Sean Stellato","seanstellato@gmail.com","Contacted"],
  ["Kaden Davis","","","LAMF Sports Management","Eddie Edwards","eddie.edwards@lsm.la","Contacted"],
  ["Miles Sanders","","","WIN Sports Group","Patrick Whitesell","contact@winsg.com","Contacted"],
  ["Zay Flowers","","","Management One","Dylan Gould","james.gould@GouldManagementGroup.com","Contacted"],
  ["Malik Cunningham","","","Neil S Schwartz Associates Inc","Neil S. Schwartz","neil@sffootball.net","Contacted"],
  ["Chris Tyree","","","Vanguard Sports Group","Kristen Kuliga","Kristen@vanguardsports.com","Contacted"],
  ["Xavier Truss","","","Universal Sports & Entertainment Management","Kevin Conner","kconner@universalsportsentertainment.com","Contacted"],
  ["Eli Apple","","","Independent Sports & Entertainment","Roosevelt Barnes","rbarnes@iseworldwide.com","Contacted"],
  ["Skyy Moore","","","United Athlete Sports","Chris Turnage","chris@uasports.us","Contacted"],
  ["Tarron Jackson","","","OTG Sports","James Martin","cmartin@otgsports.com","Contacted"],
  ["Shakel Brown","","","SportStars","Jason Chayut","Jchayut@sportstarsnyc.com","Contacted"],
  ["Renardo Green","","","Be The Best Sports Group","Chris Ellison","EllisonChris04@gmail.com","Contacted"],
  ["Jakob Robinson","","","HOF Player Representatives","Greg Linton","greglintonuk@yahoo.com","Contacted"],
  ["Demone Harris","","","Disruptive","Henry Organ","henry@disruptivesports.com","Contacted"]
];



// ─── CONSTANTS & DESIGN TOKENS ────────────────────────────────────────────────
const TODAY = new Date().toISOString().split("T")[0];
const LEAGUES = ["NFL","NBA","NHL","MLB","UFC"];
const ICONS = {NFL:"🏈",NBA:"🏀",NHL:"🏒",MLB:"⚾",UFC:"🥊"};
const STATUSES = ["Contacted","Negotiating","Proposal Sent","Closed Won","Closed Lost","Pending"];

// ATLAUA Brand Colors
const T  = "#04BDB7";          // Petrol/Teal
const W  = "#800032";          // Bordeaux/Wine
const BG = "#FFF8E8";          // Beige (used as text on dark)
const DK = "#303030";          // Dark grey
const LG = "#A6A6A6";          // Light grey
const WH = "#FFFFFF";

// Dark UI palette (inspired by the design reference)
const DARK_BG   = "#100B1A";   // Main background
const DARK_SB   = "#0A0613";   // Sidebar
const DARK_CARD = "#1A1030";   // Card surface
const DARK_CARD2= "#201540";   // Elevated card
const BORDER    = "rgba(255,248,232,0.07)";
const BORDER2   = "rgba(4,189,183,0.25)";
const TEXT1     = "#FFF8E8";   // Primary text (ATLAUA beige)
const TEXT2     = "rgba(255,248,232,0.55)";
const TEXT3     = "rgba(255,248,232,0.28)";
const GOLD      = "#F5A523";
const GREEN     = "#2FC88A";

const SCOL = {
  Contacted:      W,
  Negotiating:    T,
  "Proposal Sent":GOLD,
  "Closed Won":   GREEN,
  "Closed Lost":  "#555",
  Pending:        LG
};
const PCOLS  = [T, W, GOLD, "#7B6BD6", "#E84C8B", GREEN];
const LCOLS  = {NFL:W, NBA:T, NHL:"#7B6BD6", MLB:GREEN, UFC:GOLD};

// CSV parser
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return { headers: [], rows: [] };
  const parseRow = line => {
    const res = []; let cur = ""; let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { if (q && line[i+1]==='"') { cur+='"'; i++; } else q=!q; }
      else if (c === ',' && !q) { res.push(cur.trim()); cur = ""; }
      else cur += c;
    }
    res.push(cur.trim());
    return res;
  };
  const headers = parseRow(lines[0]);
  const rows    = lines.slice(1).map(parseRow).filter(r => r.some(c => c));
  return { headers, rows };
}

// ─── SVG LOGO ─────────────────────────────────────────────────────────────────
function AtlauaLogo({ size = 36 }) {
  return (
    <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 36 48" fill="none">
      <defs>
        <linearGradient id="drop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#04E8E0"/>
          <stop offset="100%" stopColor="#04BDB7"/>
        </linearGradient>
      </defs>
      <path d="M18 2 C18 2 2 20 2 31 C2 40.4 9.2 46 18 46 C26.8 46 34 40.4 34 31 C34 20 18 2 18 2Z"
            fill="url(#drop)" />
      <path d="M9 33 C9 37.8 13 42 18 42" stroke="#FFF8E8" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.65"/>
    </svg>
  );
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function Badge({ s }) {
  return (
    <span style={{
      background: `${SCOL[s]||LG}22`, color: SCOL[s]||LG,
      border: `1px solid ${SCOL[s]||LG}44`,
      fontSize: 10, fontWeight: 700, padding: "3px 10px",
      borderRadius: 20, fontFamily: "sans-serif", whiteSpace: "nowrap", letterSpacing: .5
    }}>{s}</span>
  );
}
function LeaguePill({ league }) {
  const c = LCOLS[league] || LG;
  return (
    <span style={{
      background: `${c}18`, border: `1px solid ${c}44`, color: c,
      fontSize: 10, padding: "2px 9px", borderRadius: 20,
      fontFamily: "sans-serif", fontWeight: 700
    }}>{league}</span>
  );
}
function GlassCard({ children, style = {} }) {
  return (
    <div style={{
      background: DARK_CARD, border: `1px solid ${BORDER}`,
      borderRadius: 16, ...style
    }}>{children}</div>
  );
}
function SectionTitle({ title, sub, right }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 28 }}>
      <div>
        <h1 style={{ margin:0, fontFamily:"Georgia,serif", color:TEXT1, fontSize:22,
                     fontWeight:700, letterSpacing:1 }}>{title}</h1>
        {sub && <p style={{ margin:"4px 0 0", fontFamily:"sans-serif", color:TEXT3,
                             fontSize:12, letterSpacing:.5 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}
function KpiCard({ label, value, sub, color = T, icon }) {
  return (
    <GlassCard style={{ padding:"22px 24px", borderTop:`3px solid ${color}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"sans-serif", fontSize:10, color:TEXT3,
                        letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>{label}</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:38, fontWeight:700,
                        color, lineHeight:1, textShadow:`0 0 30px ${color}55` }}>{value}</div>
          {sub && <div style={{ fontFamily:"sans-serif", fontSize:11, color:TEXT3, marginTop:6 }}>{sub}</div>}
        </div>
        {icon && <div style={{ fontSize:26, opacity:.35 }}>{icon}</div>}
      </div>
    </GlassCard>
  );
}
function Btn({ children, onClick, color = T, outline = false, style = {}, disabled = false }) {
  const base = {
    padding:"10px 20px", borderRadius:10, fontFamily:"sans-serif", fontWeight:700,
    fontSize:13, cursor: disabled ? "not-allowed" : "pointer", letterSpacing:.5,
    transition:"all 0.2s", border:"none", ...style
  };
  if (outline) return (
    <button onClick={onClick} disabled={disabled} style={{
      ...base, background:"transparent",
      border:`1.5px solid ${disabled?"#444":color}`, color: disabled?"#444":color,
    }}
    onMouseEnter={e=>{ if(!disabled) e.currentTarget.style.background=`${color}15`; }}
    onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; }}
    >{children}</button>
  );
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...base, background: disabled?"#333":`linear-gradient(135deg,${color},${color}CC)`,
      color:WH, boxShadow: disabled?"none":`0 4px 20px ${color}44`,
    }}
    onMouseEnter={e=>{ if(!disabled) e.currentTarget.style.boxShadow=`0 6px 28px ${color}66`; }}
    onMouseLeave={e=>{ e.currentTarget.style.boxShadow=`0 4px 20px ${color}44`; }}
    >{children}</button>
  );
}

// ─── CSV IMPORT MODAL ─────────────────────────────────────────────────────────
function ImportCSVModal({ onClose, onImport }) {
  const [step, setStep]           = useState("type");   // type → drop → map → done
  const [importType, setImportType] = useState("athletes");
  const [parsed, setParsed]       = useState(null);
  const [mapping, setMapping]     = useState({});
  const [importing, setImporting] = useState(false);
  const [count, setCount]         = useState(0);
  const [dragOver, setDragOver]   = useState(false);
  const fileRef = useRef();

  const FIELDS = importType === "athletes"
    ? ["name","team","league","agency","agent","email","status"]
    : ["name","company","category","email","phone"];

  const handleFile = file => {
    const reader = new FileReader();
    reader.onload = e => {
      const { headers, rows } = parseCSV(e.target.result);
      setParsed({ headers, rows });
      const auto = {};
      headers.forEach((h, i) => {
        const low = h.toLowerCase().replace(/[^a-z]/g,"");
        FIELDS.forEach(f => {
          if ((low === f || low.includes(f) || f.includes(low)) && auto[f] === undefined)
            auto[f] = i;
        });
      });
      setMapping(auto);
      setStep("map");
    };
    reader.readAsText(file);
  };

  const doImport = async () => {
    setImporting(true);
    const items = parsed.rows.map(row => {
      const item = { updated: TODAY };
      FIELDS.forEach(f => {
        if (mapping[f] !== undefined) item[f] = (row[mapping[f]] || "").trim();
      });
      if (importType === "athletes") {
        item.notes  = "";
        if (!item.status) item.status = "Contacted";
      } else {
        if (!item.category) item.category = "Other";
      }
      return item;
    }).filter(i => i.name);
    await onImport(items, importType);
    setCount(items.length);
    setImporting(false);
    setStep("done");
  };

  const inp = {
    width:"100%", padding:"9px 12px", borderRadius:8,
    border:`1px solid ${BORDER}`, background:DARK_CARD2,
    color:TEXT1, fontFamily:"sans-serif", fontSize:13,
    boxSizing:"border-box", outline:"none",
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(10,6,19,0.85)",
                  backdropFilter:"blur(6px)", zIndex:300,
                  display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <GlassCard style={{ width:520, maxHeight:"90vh", overflowY:"auto", border:`1px solid ${BORDER2}` }}>
        {/* Header */}
        <div style={{ padding:"22px 26px", borderBottom:`1px solid ${BORDER}`,
                      display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"Georgia,serif", color:T, fontSize:18, fontWeight:700 }}>Import CSV</div>
            <div style={{ fontFamily:"sans-serif", color:TEXT3, fontSize:12, marginTop:3 }}>
              {step==="type"?"Select data type" : step==="drop"?"Upload your file"
               : step==="map"?"Map columns" : "Import complete"}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.06)", border:"none",
            width:30, height:30, borderRadius:"50%", cursor:"pointer", color:TEXT2, fontSize:18 }}>×</button>
        </div>

        <div style={{ padding:"24px 26px" }}>

          {/* STEP 1 — Type */}
          {step==="type" && <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
              {[["athletes","🏃 Athletes","Name, Team, League, Agency, Agent, Email, Status"],
                ["contacts","👤 Contacts","Name, Company, Category, Email, Phone"]].map(([v,label,desc])=>(
                <div key={v} onClick={()=>setImportType(v)} style={{
                  padding:"18px 16px", borderRadius:12, cursor:"pointer",
                  border:`2px solid ${importType===v?T:BORDER}`,
                  background: importType===v?`${T}12`:DARK_CARD2
                }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{label.split(" ")[0]}</div>
                  <div style={{ fontFamily:"sans-serif", fontWeight:700, color:TEXT1, fontSize:14, marginBottom:6 }}>{label.split(" ").slice(1).join(" ")}</div>
                  <div style={{ fontFamily:"sans-serif", color:TEXT3, fontSize:11, lineHeight:1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
            <Btn onClick={()=>setStep("drop")} style={{ width:"100%" }}>Continue →</Btn>
          </>}

          {/* STEP 2 — Drop zone */}
          {step==="drop" && <>
            <input ref={fileRef} type="file" accept=".csv" style={{ display:"none" }}
                   onChange={e=>{ if(e.target.files[0]) handleFile(e.target.files[0]); }}/>
            <div
              onClick={()=>fileRef.current.click()}
              onDragOver={e=>{ e.preventDefault(); setDragOver(true); }}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{ e.preventDefault(); setDragOver(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
              style={{
                border:`2px dashed ${dragOver?T:BORDER2}`, borderRadius:14,
                padding:"48px 24px", textAlign:"center", cursor:"pointer",
                background: dragOver?`${T}0A`:DARK_CARD2, marginBottom:20,
                transition:"all 0.2s"
              }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📄</div>
              <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontSize:16, marginBottom:8 }}>
                Drop your CSV here
              </div>
              <div style={{ fontFamily:"sans-serif", color:TEXT3, fontSize:13 }}>
                or click to browse
              </div>
            </div>
            <div style={{ fontFamily:"sans-serif", color:TEXT3, fontSize:11, textAlign:"center",
                          padding:"12px", background:DARK_CARD2, borderRadius:8 }}>
              Tip: Column headers should match field names for auto-mapping. Any CSV format accepted.
            </div>
          </>}

          {/* STEP 3 — Mapping */}
          {step==="map" && parsed && <>
            <div style={{ marginBottom:16, padding:"10px 14px", background:DARK_CARD2,
                          borderRadius:8, fontFamily:"sans-serif", fontSize:12, color:TEXT2 }}>
              Found <strong style={{color:T}}>{parsed.rows.length}</strong> rows,{" "}
              <strong style={{color:T}}>{parsed.headers.length}</strong> columns. Map them below:
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {FIELDS.map(field => (
                <div key={field} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, alignItems:"center" }}>
                  <div style={{ fontFamily:"sans-serif", fontSize:12, color:TEXT1, fontWeight:700,
                                textTransform:"uppercase", letterSpacing:1 }}>{field}</div>
                  <select value={mapping[field]??""} onChange={e=>setMapping(m=>({...m,[field]:e.target.value===""?undefined:+e.target.value}))} style={inp}>
                    <option value="">— skip —</option>
                    {parsed.headers.map((h,i)=><option key={i} value={i}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn outline onClick={()=>setStep("drop")} style={{ flex:1 }}>← Back</Btn>
              <Btn onClick={doImport} disabled={importing} color={W} style={{ flex:2 }}>
                {importing ? "Importing…" : `Import ${parsed.rows.length} rows →`}
              </Btn>
            </div>
          </>}

          {/* STEP 4 — Done */}
          {step==="done" && (
            <div style={{ textAlign:"center", padding:"32px 0" }}>
              <div style={{ fontSize:52, marginBottom:16 }}>✅</div>
              <div style={{ fontFamily:"Georgia,serif", color:T, fontSize:22, marginBottom:8 }}>
                {count} records imported!
              </div>
              <div style={{ fontFamily:"sans-serif", color:TEXT2, fontSize:14, marginBottom:24 }}>
                Your {importType} have been added successfully.
              </div>
              <Btn onClick={onClose} style={{ minWidth:180 }}>Done</Btn>
            </div>
          )}

        </div>
      </GlassCard>
    </div>
  );
}

// ─── ATHLETE PANEL ────────────────────────────────────────────────────────────
function Panel({ a, onClose, onSave }) {
  const [st, setSt]     = useState(a.status);
  const [notes, setNotes] = useState(a.notes || "");
  const [loading, setLoading] = useState(false);
  const save = () => onSave(a.id, { status:st, notes, updated:TODAY });

  const genAndOpenGmail = async () => {
    if (!a.email) { alert("No email on record for this athlete."); return; }
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:320,
          messages:[{ role:"user", content:
            `You are a brand partnership manager at ATLAUA — God of Water, a premium sports lifestyle brand (electrolyzed water + CBD recovery drink). Write a short warm first-contact email to ${a.agent} at ${a.agency}, representing ${a.name} (${a.team||"independent"}, ${a.league}). Propose a brand ambassador partnership. Tone: bold, luxurious, motivating. Start with Subject: line. Max 130 words total.`
          }]
        })
      });
      const d = await res.json();
      const text = d.content?.[0]?.text || "";
      const lines = text.split("\n");
      const subLine = lines.find(l => /^subject:/i.test(l.trim()));
      const subject = subLine ? subLine.replace(/^subject:\s*/i,"").trim() : "ATLAUA Partnership Opportunity";
      const body = lines.filter(l => !/^subject:/i.test(l.trim())).join("\n").trim();
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(a.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(url, "_blank");
    } catch(e) { alert("Error generating email. Check connection."); }
    setLoading(false);
  };

  const inp = {
    width:"100%", padding:"10px 12px", borderRadius:8,
    border:`1px solid ${BORDER}`, background:DARK_CARD2,
    color:TEXT1, fontFamily:"sans-serif", fontSize:14,
    boxSizing:"border-box", outline:"none"
  };
  const lbl = {
    display:"block", fontSize:10, color:TEXT3,
    letterSpacing:2, textTransform:"uppercase",
    marginBottom:6, fontFamily:"sans-serif", fontWeight:700
  };

  return <>
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(10,6,19,0.7)",
                                    backdropFilter:"blur(4px)", zIndex:98 }}/>
    <div style={{
      position:"fixed", top:0, right:0, width:420, height:"100vh",
      background:DARK_SB, zIndex:99, overflowY:"auto",
      borderLeft:`1px solid ${BORDER2}`, display:"flex", flexDirection:"column"
    }}>
      {/* Header */}
      <div style={{
        padding:"24px", borderBottom:`1px solid ${BORDER}`,
        background:`linear-gradient(135deg,${W}22,${T}11)`
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
          <div style={{ fontSize:10, color:TEXT3, letterSpacing:3, textTransform:"uppercase", fontFamily:"sans-serif" }}>Athlete Profile</div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.07)", border:"none",
            width:28, height:28, borderRadius:"50%", cursor:"pointer", color:TEXT2, fontSize:18,
            display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontSize:22, fontWeight:700, marginBottom:12 }}>{a.name}</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          <LeaguePill league={a.league}/>
          {a.team && <span style={{ background:DARK_CARD, border:`1px solid ${BORDER}`,
            color:TEXT2, fontSize:10, padding:"2px 10px", borderRadius:20, fontFamily:"sans-serif" }}>{a.team}</span>}
          <Badge s={st}/>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:24, flex:1, display:"flex", flexDirection:"column", gap:16 }}>
        {/* Agency block */}
        <GlassCard style={{ padding:"14px 18px", background:DARK_CARD2 }}>
          <div style={{ fontSize:10, color:T, letterSpacing:2, textTransform:"uppercase",
                        fontFamily:"sans-serif", marginBottom:8, fontWeight:700 }}>Agency</div>
          <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontWeight:700, fontSize:15, marginBottom:4 }}>{a.agency}</div>
          <div style={{ fontFamily:"sans-serif", color:TEXT2, fontSize:13, marginBottom:4 }}>{a.agent}</div>
          {a.email && <div style={{ fontFamily:"sans-serif", color:T, fontSize:12, opacity:.8 }}>✉ {a.email}</div>}
        </GlassCard>

        {/* Status */}
        <div>
          <label style={lbl}>Status</label>
          <select value={st} onChange={e=>setSt(e.target.value)} style={inp}>
            {STATUSES.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label style={lbl}>Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
            placeholder="Add notes…" style={{...inp, resize:"vertical"}}/>
        </div>

        <Btn onClick={save} color={T} style={{ width:"100%" }}>Save Changes</Btn>

        {/* Gmail outreach */}
        <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:16 }}>
          <div style={{ fontSize:10, color:TEXT3, letterSpacing:2, textTransform:"uppercase",
                        fontFamily:"sans-serif", marginBottom:10, fontWeight:700 }}>AI Outreach</div>
          <Btn onClick={genAndOpenGmail} disabled={loading} color={W} style={{ width:"100%" }}>
            {loading ? "Generating…" : "✉ Draft & Open in Gmail ↗"}
          </Btn>
          <div style={{ fontFamily:"sans-serif", fontSize:11, color:TEXT3, marginTop:8, textAlign:"center" }}>
            AI writes the email · opens Gmail in a new tab instantly
          </div>
        </div>

        <div style={{ fontFamily:"sans-serif", fontSize:10, color:TEXT3, textAlign:"right" }}>Updated: {a.updated}</div>
      </div>
    </div>
  </>;
}

// ─── ADD MODAL ────────────────────────────────────────────────────────────────
function AddModal({ athletes, onClose, onAdd }) {
  const [tab, setTab]   = useState("athlete");
  const [af, setAf]     = useState({ name:"", team:"", league:"NFL", agency:"", agent:"", email:"", status:"Contacted" });
  const [cf, setCf]     = useState({ name:"", company:"", category:"Distributor", email:"", phone:"" });
  const [sug, setSug]   = useState([]);
  const agencies = useMemo(()=>[...new Set(athletes.map(a=>a.agency).filter(Boolean))].sort(),[athletes]);

  const inp = {
    width:"100%", padding:"10px 12px", borderRadius:8,
    border:`1px solid ${BORDER}`, background:DARK_CARD2,
    color:TEXT1, fontFamily:"sans-serif", fontSize:14,
    boxSizing:"border-box", outline:"none"
  };
  const lbl = { display:"block", fontSize:10, color:TEXT3, letterSpacing:2,
                textTransform:"uppercase", marginBottom:5, fontFamily:"sans-serif", fontWeight:700 };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(10,6,19,0.85)",
                  backdropFilter:"blur(6px)", zIndex:200,
                  display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <GlassCard style={{ width:460, maxHeight:"90vh", overflowY:"auto", border:`1px solid ${BORDER2}` }}>
        {/* Header */}
        <div style={{ padding:"20px 24px", borderBottom:`1px solid ${BORDER}`,
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      background:`linear-gradient(135deg,${T}15,${W}10)` }}>
          <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontSize:18, fontWeight:700 }}>Add New</div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.07)", border:"none",
            width:30, height:30, borderRadius:"50%", cursor:"pointer", color:TEXT2, fontSize:18 }}>×</button>
        </div>
        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:`1px solid ${BORDER}` }}>
          {[["athlete","🏃 Athlete"],["contact","👤 Contact"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTab(v)} style={{
              flex:1, padding:"12px", border:"none", background:"transparent",
              cursor:"pointer", fontFamily:"sans-serif", fontWeight: tab===v?700:400,
              color: tab===v?T:TEXT3, borderBottom:`2px solid ${tab===v?T:"transparent"}`,
              fontSize:14, transition:"all 0.15s"
            }}>{l}</button>
          ))}
        </div>
        {/* Form */}
        <div style={{ padding:"20px 24px 24px", display:"flex", flexDirection:"column", gap:13 }}>
          {tab==="athlete" ? <>
            {[["name","Name *"],["team","Team"],["agent","Agent Name"],["email","Email"]].map(([k,l])=>(
              <div key={k}><label style={lbl}>{l}</label>
                <input value={af[k]} onChange={e=>setAf(f=>({...f,[k]:e.target.value}))} style={inp}/>
              </div>
            ))}
            <div style={{ position:"relative" }}>
              <label style={lbl}>Agency</label>
              <input value={af.agency} onChange={e=>{ setAf(f=>({...f,agency:e.target.value}));
                setSug(e.target.value.length>1?agencies.filter(a=>a.toLowerCase().includes(e.target.value.toLowerCase())).slice(0,5):[]); }}
                style={inp} placeholder="Type to search…"/>
              {sug.length>0 && (
                <div style={{ position:"absolute", top:"100%", left:0, right:0, background:DARK_CARD,
                              border:`1px solid ${BORDER2}`, borderRadius:8, zIndex:10, overflow:"hidden" }}>
                  {sug.map(a=>(
                    <div key={a} onClick={()=>{ setAf(f=>({...f,agency:a})); setSug([]); }}
                      style={{ padding:"9px 14px", cursor:"pointer", fontFamily:"sans-serif",
                               fontSize:13, color:TEXT1, borderBottom:`1px solid ${BORDER}` }}
                      onMouseEnter={e=>e.currentTarget.style.background=DARK_CARD2}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                    >{a}</div>
                  ))}
                </div>
              )}
            </div>
            <div><label style={lbl}>League</label>
              <select value={af.league} onChange={e=>setAf(f=>({...f,league:e.target.value}))} style={inp}>
                {LEAGUES.map(l=><option key={l}>{l}</option>)}</select></div>
            <div><label style={lbl}>Status</label>
              <select value={af.status} onChange={e=>setAf(f=>({...f,status:e.target.value}))} style={inp}>
                {STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
            <Btn onClick={()=>{ if(!af.name)return; onAdd({...af,notes:"",updated:TODAY}); onClose(); }}
              color={T} style={{ marginTop:4 }}>Add Athlete</Btn>
          </> : <>
            {[["name","Name *"],["company","Company"],["email","Email"],["phone","Phone"]].map(([k,l])=>(
              <div key={k}><label style={lbl}>{l}</label>
                <input value={cf[k]} onChange={e=>setCf(f=>({...f,[k]:e.target.value}))} style={inp}/>
              </div>
            ))}
            <div><label style={lbl}>Category</label>
              <select value={cf.category} onChange={e=>setCf(f=>({...f,category:e.target.value}))} style={inp}>
                {["Distributor","Brand","Media","Partner","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
            <Btn onClick={()=>{ if(!cf.name)return; onAdd({...cf,updated:TODAY},"contact"); onClose(); }}
              color={W} style={{ marginTop:4 }}>Add Contact</Btn>
          </>}
        </div>
      </GlassCard>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ athletes }) {
  const agCount  = useMemo(()=>new Set(athletes.map(a=>a.agency).filter(Boolean)).size,[athletes]);
  const neg      = athletes.filter(a=>a.status==="Negotiating").length;
  const won      = athletes.filter(a=>a.status==="Closed Won").length;
  const contacted= athletes.filter(a=>a.status==="Contacted").length;

  const byLeague = useMemo(()=>LEAGUES.map(l=>({ name:l, value:athletes.filter(a=>a.league===l).length })).filter(x=>x.value>0),[athletes]);
  const bySt     = useMemo(()=>STATUSES.map(s=>({ name:s, value:athletes.filter(a=>a.status===s).length })).filter(x=>x.value>0),[athletes]);
  const topAg    = useMemo(()=>{
    const m={};
    athletes.forEach(a=>{ if(a.agency) m[a.agency]=(m[a.agency]||0)+1; });
    return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([name,value])=>({
      name: name.length>20?name.slice(0,20)+"…":name, value
    }));
  },[athletes]);

  // Build a fake weekly trend from status data for area chart
  const trendData = useMemo(()=>{
    const now = Date.now();
    return Array.from({length:7},(_,i)=>({
      day:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
      contacted: Math.round(contacted * (0.8 + Math.random()*0.4) / 7),
      negotiating: Math.round(neg * (0.8 + Math.random()*0.4) / 7),
    }));
  },[athletes]);

  const tt = { contentStyle:{ background:DARK_CARD, border:`1px solid ${BORDER2}`, borderRadius:8, color:TEXT1 },
               labelStyle:{ color:T }, itemStyle:{ color:TEXT2 } };

  return (
    <div>
      {/* Hero banner */}
      <div style={{
        background:`linear-gradient(135deg,${W}44 0%,${DARK_CARD} 40%,${T}22 100%)`,
        border:`1px solid ${BORDER}`, borderRadius:20, padding:"32px 36px",
        marginBottom:28, position:"relative", overflow:"hidden"
      }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:220, height:220,
                      borderRadius:"50%", background:`${T}12` }}/>
        <div style={{ position:"absolute", bottom:-80, left:30, width:160, height:160,
                      borderRadius:"50%", background:`${W}12` }}/>
        <div style={{ position:"relative" }}>
          <div style={{ fontFamily:"sans-serif", fontSize:10, color:TEXT3,
                        letterSpacing:4, textTransform:"uppercase", marginBottom:8 }}>ATLAUA · GOD OF WATER</div>
          <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontSize:32,
                        fontWeight:700, letterSpacing:2, marginBottom:20 }}>CRM Dashboard</div>
          <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
            {[[athletes.length,"Athletes",T],[agCount,"Agencies",BG],[neg,"Negotiating",GOLD],[won,"Closed Won",GREEN]].map(([v,l,c])=>(
              <div key={l}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:34, color:c,
                              fontWeight:700, lineHeight:1, textShadow:`0 0 24px ${c}55` }}>{v}</div>
                <div style={{ fontFamily:"sans-serif", fontSize:10, color:TEXT3,
                              letterSpacing:2, textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        <KpiCard label="Total Athletes"  value={athletes.length} color={T}    icon="🏃"/>
        <KpiCard label="Agencies"        value={agCount}         color={W}    icon="🏢"/>
        <KpiCard label="Negotiating"     value={neg}             color={GOLD} icon="🤝"/>
        <KpiCard label="Closed Won"      value={won}             color={GREEN}icon="✅"/>
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:18, marginBottom:18 }}>
        {/* Area chart - trend */}
        <GlassCard style={{ padding:"22px 20px" }}>
          <div style={{ fontSize:10, color:TEXT3, letterSpacing:2, textTransform:"uppercase",
                        fontFamily:"sans-serif", marginBottom:16, fontWeight:700 }}>Weekly Activity</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData} margin={{left:-10,right:8}}>
              <defs>
                <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={T} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={W} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={W} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke={BORDER} strokeDasharray="3 3"/>
              <XAxis dataKey="day" tick={{ fill:TEXT3, fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:TEXT3, fontSize:11 }} axisLine={false} tickLine={false}/>
              <Tooltip {...tt}/>
              <Area type="monotone" dataKey="contacted"   stroke={T} fill="url(#gc)" strokeWidth={2.5}/>
              <Area type="monotone" dataKey="negotiating" stroke={W} fill="url(#gw)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Pie - by league */}
        <GlassCard style={{ padding:"22px 20px" }}>
          <div style={{ fontSize:10, color:TEXT3, letterSpacing:2, textTransform:"uppercase",
                        fontFamily:"sans-serif", marginBottom:16, fontWeight:700 }}>By League</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={byLeague} dataKey="value" nameKey="name" cx="50%" cy="50%"
                   outerRadius={72} innerRadius={32} paddingAngle={3}>
                {byLeague.map((e,i)=><Cell key={i} fill={PCOLS[i%PCOLS.length]}/>)}
              </Pie>
              <Tooltip {...tt}/>
              <Legend iconType="circle" iconSize={8}
                      wrapperStyle={{ fontSize:11, fontFamily:"sans-serif", color:TEXT2 }}/>
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Bottom row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {/* Status bar */}
        <GlassCard style={{ padding:"22px 20px" }}>
          <div style={{ fontSize:10, color:TEXT3, letterSpacing:2, textTransform:"uppercase",
                        fontFamily:"sans-serif", marginBottom:16, fontWeight:700 }}>Pipeline Status</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={bySt} layout="vertical" margin={{left:4,right:16}}>
              <XAxis type="number" tick={{ fill:TEXT3, fontSize:10 }} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="name" width={110}
                     tick={{ fill:TEXT2, fontSize:11, fontFamily:"sans-serif" }} axisLine={false} tickLine={false}/>
              <Tooltip {...tt}/>
              <Bar dataKey="value" fill={T} radius={[0,5,5,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Top agencies */}
        <GlassCard style={{ padding:"22px 20px" }}>
          <div style={{ fontSize:10, color:TEXT3, letterSpacing:2, textTransform:"uppercase",
                        fontFamily:"sans-serif", marginBottom:16, fontWeight:700 }}>Top Agencies</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={topAg} margin={{bottom:36,left:0,right:8}}>
              <XAxis dataKey="name" tick={{ fill:TEXT3, fontSize:9, angle:-30, textAnchor:"end" }}
                     interval={0} height={50} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:TEXT3, fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip {...tt}/>
              <Bar dataKey="value" fill={W} radius={[5,5,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── ATHLETES ─────────────────────────────────────────────────────────────────
function Athletes({ athletes, onSelect, onImport }) {
  const [q,setQ]=useState(""); const [dq,setDq]=useState("");
  const [fL,setFL]=useState(""); const [fS,setFS]=useState(""); const [pg,setPg]=useState(0);
  const [showImport,setShowImport]=useState(false);
  const PER=50; const ref=useRef();
  useEffect(()=>{ clearTimeout(ref.current); ref.current=setTimeout(()=>setDq(q),150); },[q]);

  const filtered=useMemo(()=>{
    const lq=dq.toLowerCase();
    return athletes.filter(a=>(
      (!lq||[a.name,a.agent,a.agency,a.team].some(v=>(v||"").toLowerCase().includes(lq)))
      &&(!fL||a.league===fL)&&(!fS||a.status===fS)
    ));
  },[athletes,dq,fL,fS]);

  const paged = filtered.slice(pg*PER,(pg+1)*PER);
  const pages = Math.ceil(filtered.length/PER);

  const exportCSV=()=>{
    const rows=[["Name","Team","League","Agency","Agent","Email","Status","Updated"],
                ...filtered.map(a=>[a.name,a.team||"",a.league,a.agency,a.agent,a.email,a.status,a.updated])];
    const csv=rows.map(r=>r.map(v=>`"${(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const b=new Blob([csv],{type:"text/csv"});
    const x=document.createElement("a");x.href=URL.createObjectURL(b);
    x.download=`atlaua-athletes-${TODAY}.csv`;x.click();
  };

  const sel={padding:"9px 12px",borderRadius:8,border:`1px solid ${BORDER}`,background:DARK_CARD2,
             color:TEXT1,fontFamily:"sans-serif",fontSize:13,cursor:"pointer",outline:"none"};

  return (
    <div>
      {showImport && <ImportCSVModal onClose={()=>setShowImport(false)} onImport={onImport}/>}
      <SectionTitle title="Athletes" sub={`${filtered.length} of ${athletes.length} athletes`}
        right={
          <div style={{ display:"flex", gap:8 }}>
            <Btn outline color={T} onClick={()=>setShowImport(true)}>↑ Import CSV</Btn>
            <Btn outline color={W} onClick={exportCSV}>↓ Export CSV</Btn>
          </div>
        }/>

      <GlassCard style={{ padding:"12px 16px", marginBottom:16,
                          display:"flex", gap:10, flexWrap:"wrap" }}>
        <input value={q} onChange={e=>{setQ(e.target.value);setPg(0)}}
          placeholder="🔍  Search name, agent, agency, team…"
          style={{ flex:"2 1 200px", ...sel, background:DARK_CARD }}/>
        <select value={fL} onChange={e=>{setFL(e.target.value);setPg(0)}} style={sel}>
          <option value="">All Leagues</option>{LEAGUES.map(l=><option key={l}>{l}</option>)}
        </select>
        <select value={fS} onChange={e=>{setFS(e.target.value);setPg(0)}} style={sel}>
          <option value="">All Statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}
        </select>
      </GlassCard>

      <GlassCard style={{ overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${BORDER}`, background:DARK_CARD2 }}>
                {["Athlete","League","Team","Agency","Agent","Status","Updated"].map(h=>(
                  <th key={h} style={{ padding:"11px 16px", textAlign:"left", fontFamily:"sans-serif",
                                       fontSize:10, color:T, letterSpacing:2, textTransform:"uppercase",
                                       whiteSpace:"nowrap", fontWeight:700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((a,i)=>(
                <tr key={a.id} onClick={()=>onSelect(a)} style={{
                  background:i%2===0?"transparent":DARK_CARD2,
                  cursor:"pointer", borderBottom:`1px solid ${BORDER}`, transition:"background 0.1s"
                }}
                onMouseEnter={e=>e.currentTarget.style.background=`${T}0A`}
                onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"transparent":DARK_CARD2}>
                  <td style={{ padding:"11px 16px", fontFamily:"sans-serif", fontWeight:700, color:TEXT1, whiteSpace:"nowrap" }}>{a.name}</td>
                  <td style={{ padding:"11px 16px" }}><LeaguePill league={a.league}/></td>
                  <td style={{ padding:"11px 16px", fontFamily:"sans-serif", fontSize:13, color:TEXT2 }}>{a.team||<span style={{color:TEXT3}}>—</span>}</td>
                  <td style={{ padding:"11px 16px", fontFamily:"sans-serif", fontSize:13, color:TEXT2, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.agency}</td>
                  <td style={{ padding:"11px 16px", fontFamily:"sans-serif", fontSize:13, color:TEXT3, maxWidth:130, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.agent}</td>
                  <td style={{ padding:"11px 16px" }}><Badge s={a.status}/></td>
                  <td style={{ padding:"11px 16px", fontFamily:"sans-serif", fontSize:11, color:TEXT3 }}>{a.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages>1 && (
          <div style={{ padding:"12px 16px", borderTop:`1px solid ${BORDER}`,
                        display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap" }}>
            {Array.from({length:pages},(_,i)=>(
              <button key={i} onClick={()=>setPg(i)} style={{
                minWidth:32, height:32, borderRadius:8,
                border:`1px solid ${pg===i?T:BORDER}`,
                background:pg===i?T:"transparent",
                color:pg===i?DARK_BG:TEXT2,
                cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:pg===i?700:400
              }}>{i+1}</button>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

// ─── AGENCIES ─────────────────────────────────────────────────────────────────
function Agencies({ athletes, onSelect }) {
  const [q,setQ]=useState(""); const [sort,setSort]=useState("count"); const [exp,setExp]=useState(null);
  const data=useMemo(()=>{
    const m={};
    athletes.forEach(a=>{ if(!a.agency)return;
      if(!m[a.agency])m[a.agency]={name:a.agency,athletes:[],agents:new Set(),leagues:new Set()};
      m[a.agency].athletes.push(a);m[a.agency].agents.add(a.agent);m[a.agency].leagues.add(a.league);
    });
    let list=Object.values(m).map(x=>({...x,agents:[...x.agents],leagues:[...x.leagues]}));
    if(q)list=list.filter(x=>x.name.toLowerCase().includes(q.toLowerCase()));
    return sort==="az"?list.sort((a,b)=>a.name.localeCompare(b.name)):list.sort((a,b)=>b.athletes.length-a.athletes.length);
  },[athletes,q,sort]);

  return (
    <div>
      <SectionTitle title="Agencies" sub={`${data.length} agencies`}
        right={
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{
            padding:"9px 12px", borderRadius:8, border:`1px solid ${BORDER}`,
            background:DARK_CARD2, color:TEXT1, fontFamily:"sans-serif", fontSize:13, cursor:"pointer"
          }}>
            <option value="count">Most Athletes</option>
            <option value="az">A – Z</option>
          </select>
        }/>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Search agencies…"
        style={{ width:"100%", padding:"10px 16px", borderRadius:8, border:`1px solid ${BORDER}`,
                 background:DARK_CARD, color:TEXT1, fontFamily:"sans-serif", fontSize:14,
                 marginBottom:18, boxSizing:"border-box", outline:"none" }}/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:14 }}>
        {data.map(ag=>(
          <GlassCard key={ag.name} style={{ overflow:"hidden", borderTop:`3px solid ${T}` }}>
            <div style={{ padding:"18px 20px" }}>
              <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontSize:14, fontWeight:700, marginBottom:4, lineHeight:1.3 }}>{ag.name}</div>
              <div style={{ fontFamily:"Georgia,serif", color:T, fontSize:34, fontWeight:700,
                            lineHeight:1, marginBottom:10, textShadow:`0 0 20px ${T}44` }}>{ag.athletes.length}</div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:10 }}>
                {ag.leagues.map(l=><LeaguePill key={l} league={l}/>)}
              </div>
              <div style={{ fontFamily:"sans-serif", fontSize:11, color:TEXT3, marginBottom:14, lineHeight:1.5 }}>
                {ag.agents.slice(0,2).join(" · ")}{ag.agents.length>2?` +${ag.agents.length-2} more`:""}
              </div>
              <Btn outline color={T} onClick={()=>setExp(exp===ag.name?null:ag.name)}
                style={{ width:"100%", fontSize:12 }}>
                {exp===ag.name?"Hide Roster ▲":"View Roster ▼"}
              </Btn>
            </div>
            {exp===ag.name && (
              <div style={{ borderTop:`1px solid ${BORDER}`, maxHeight:220, overflowY:"auto" }}>
                {ag.athletes.map(a=>(
                  <div key={a.id} onClick={()=>onSelect(a)} style={{
                    padding:"9px 20px", display:"flex", justifyContent:"space-between",
                    alignItems:"center", cursor:"pointer", borderBottom:`1px solid ${BORDER}`, transition:"background 0.1s"
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background=`${T}0A`}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{ fontFamily:"sans-serif", fontSize:13, color:TEXT1, fontWeight:600 }}>{a.name}</span>
                    <Badge s={a.status}/>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── TEAMS ────────────────────────────────────────────────────────────────────
function Teams({ athletes, onSelect }) {
  const [lg,setLg]=useState("NFL"); const [open,setOpen]=useState(null);
  const data=useMemo(()=>{
    const m={};
    athletes.filter(a=>a.league===lg).forEach(a=>{
      const t=a.team||"Independent";
      if(!m[t])m[t]=[];m[t].push(a);
    });
    return Object.entries(m).sort((a,b)=>b[1].length-a[1].length);
  },[athletes,lg]);

  return (
    <div>
      <SectionTitle title="Teams" sub="Browse athletes by team"/>
      <div style={{ display:"flex", gap:8, marginBottom:22, flexWrap:"wrap" }}>
        {LEAGUES.map(l=>(
          <button key={l} onClick={()=>{setLg(l);setOpen(null);}} style={{
            padding:"8px 20px", borderRadius:20,
            border:`2px solid ${lg===l?(LCOLS[l]||T):BORDER}`,
            background: lg===l?`${LCOLS[l]||T}22`:"transparent",
            color: lg===l?(LCOLS[l]||T):TEXT2,
            cursor:"pointer", fontFamily:"sans-serif", fontWeight:700, fontSize:14,
            transition:"all 0.15s"
          }}>{ICONS[l]} {l}</button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {data.map(([team,aths])=>(
          <GlassCard key={team} style={{ overflow:"hidden" }}>
            <div onClick={()=>setOpen(open===team?null:team)} style={{
              padding:"14px 20px", cursor:"pointer", display:"flex",
              justifyContent:"space-between", alignItems:"center",
              borderLeft:`3px solid ${open===team?(LCOLS[lg]||T):"transparent"}`,
              background: open===team?`${LCOLS[lg]||T}0A`:"transparent", transition:"all 0.15s"
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontFamily:"Georgia,serif", color:TEXT1, fontWeight:700, fontSize:15 }}>{team}</span>
                <span style={{ background:`${LCOLS[lg]||T}18`, color:LCOLS[lg]||T, fontSize:11,
                               padding:"2px 10px", borderRadius:20, fontFamily:"sans-serif", fontWeight:700 }}>{aths.length}</span>
              </div>
              <span style={{ color:TEXT3, fontSize:14 }}>{open===team?"▲":"▼"}</span>
            </div>
            {open===team && (
              <div style={{ borderTop:`1px solid ${BORDER}` }}>
                <div style={{ padding:"8px 20px 6px", display:"flex", gap:14, flexWrap:"wrap",
                              borderBottom:`1px solid ${BORDER}` }}>
                  {STATUSES.map(s=>{ const n=aths.filter(a=>a.status===s).length;
                    return n>0?<span key={s} style={{ fontFamily:"sans-serif",fontSize:11,color:TEXT3 }}>
                      {s}: <strong style={{color:SCOL[s]}}>{n}</strong></span>:null; })}
                </div>
                {aths.map(a=>(
                  <div key={a.id} onClick={()=>onSelect(a)} style={{
                    padding:"10px 20px", display:"flex", justifyContent:"space-between",
                    alignItems:"center", cursor:"pointer", borderBottom:`1px solid ${BORDER}`, transition:"background 0.1s"
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background=`${T}0A`}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{ fontFamily:"sans-serif", fontSize:14, color:TEXT1, fontWeight:600 }}>{a.name}</span>
                    <Badge s={a.status}/>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── PIPELINE ─────────────────────────────────────────────────────────────────
const PCOL_LIST = ["Contacted","Negotiating","Proposal Sent","Closed Won","Closed Lost"];
function Pipeline({ athletes, onUpdate, onSelect }) {
  const [drag,setDrag]=useState(null); const [over,setOver]=useState(null);
  const grouped=useMemo(()=>{
    const m={};PCOL_LIST.forEach(c=>m[c]=[]);
    athletes.forEach(a=>{const c=PCOL_LIST.includes(a.status)?a.status:"Contacted";m[c].push(a);});
    return m;
  },[athletes]);
  return (
    <div>
      <SectionTitle title="Pipeline" sub="Drag cards between columns to update status"/>
      <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:16, alignItems:"flex-start" }}>
        {PCOL_LIST.map(col=>(
          <div key={col}
            onDragOver={e=>{e.preventDefault();setOver(col);}}
            onDrop={()=>{ if(drag&&drag.status!==col)onUpdate(drag.id,{status:col,updated:TODAY}); setDrag(null);setOver(null); }}
            style={{
              minWidth:210, flex:"0 0 210px", borderRadius:14, padding:12,
              background: over===col?`${SCOL[col]||T}10`:DARK_CARD,
              border:`2px solid ${over===col?(SCOL[col]||T):BORDER}`, transition:"all 0.15s"
            }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                          marginBottom:12, paddingBottom:10, borderBottom:`2px solid ${SCOL[col]||T}` }}>
              <span style={{ fontFamily:"sans-serif", fontSize:10, color:TEXT1,
                             textTransform:"uppercase", letterSpacing:2, fontWeight:700 }}>{col}</span>
              <span style={{ background:`${SCOL[col]||T}22`, color:SCOL[col]||T,
                             borderRadius:12, padding:"2px 9px", fontSize:11,
                             fontFamily:"sans-serif", fontWeight:700 }}>{(grouped[col]||[]).length}</span>
            </div>
            {(grouped[col]||[]).map(a=>(
              <div key={a.id} draggable
                onDragStart={()=>setDrag(a)} onDragEnd={()=>{setDrag(null);setOver(null);}}
                onClick={()=>onSelect(a)}
                style={{
                  background: DARK_CARD2, borderRadius:10, padding:"11px 14px",
                  marginBottom:8, borderLeft:`4px solid ${SCOL[col]||T}`,
                  cursor:"grab", border:`1px solid ${BORDER}`,
                  borderLeftWidth:4, borderLeftColor:SCOL[col]||T,
                  opacity:drag?.id===a.id?0.3:1, transition:"opacity 0.1s"
                }}>
                <div style={{ fontFamily:"sans-serif", fontWeight:700, fontSize:13, color:TEXT1, marginBottom:3 }}>{a.name}</div>
                <div style={{ fontFamily:"sans-serif", fontSize:11, color:TEXT3, lineHeight:1.4 }}>
                  {a.agency.length>28?a.agency.slice(0,28)+"…":a.agency}
                </div>
                {a.team && <div style={{ fontFamily:"sans-serif", fontSize:10, color:T, marginTop:4, fontWeight:600 }}>{a.team}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONTACTS ─────────────────────────────────────────────────────────────────
function Contacts({ contacts, onImport }) {
  const [open,setOpen]=useState(null);
  const [showImport,setShowImport]=useState(false);
  const CATS = ["Distributor","Brand","Media","Partner","Other"];
  const CAT_COL2 = {Distributor:T,Brand:W,Media:"#7B6BD6",Partner:GREEN,Other:LG};
  const CAT_ICON2 = {Distributor:"🏭",Brand:"⭐",Media:"📰",Partner:"🤝",Other:"📌"};
  const grouped = useMemo(()=>{
    const m={}; CATS.forEach(c=>m[c]=[]);
    contacts.forEach(c=>{ const cat=CATS.includes(c.category)?c.category:"Other"; m[cat].push(c); });
    return m;
  },[contacts]);

  return (
    <div>
      {showImport && <ImportCSVModal onClose={()=>setShowImport(false)} onImport={onImport}/>}
      <SectionTitle title="Contacts" sub="Grouped by category · Distributors, Brands, Media, Partners"
        right={<Btn outline color={T} onClick={()=>setShowImport(true)}>↑ Import CSV</Btn>}/>

      {!contacts.length ? (
        <GlassCard style={{ padding:60, textAlign:"center" }}>
          <div style={{ fontSize:52, marginBottom:16 }}>📋</div>
          <div style={{ fontFamily:"Georgia,serif", color:T, fontSize:18, marginBottom:8 }}>NO CONTACTS YET</div>
          <div style={{ fontFamily:"sans-serif", color:TEXT3, fontSize:14 }}>Use the + button to add distributors, brands, media, and partners.</div>
        </GlassCard>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {CATS.map(cat=>{
            const list=grouped[cat]||[];
            if(!list.length) return null;
            const cc=CAT_COL2[cat];
            const isOpen=open===cat;
            return (
              <GlassCard key={cat} style={{ overflow:"hidden", borderLeft:`4px solid ${cc}` }}>
                <div onClick={()=>setOpen(isOpen?null:cat)} style={{
                  padding:"16px 22px", cursor:"pointer", display:"flex",
                  justifyContent:"space-between", alignItems:"center",
                  background:isOpen?`${cc}0A`:"transparent", transition:"background 0.15s"
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:20 }}>{CAT_ICON2[cat]}</span>
                    <div>
                      <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontWeight:700, fontSize:16 }}>{cat}s</div>
                      <div style={{ fontFamily:"sans-serif", color:TEXT3, fontSize:12, marginTop:2 }}>{list.length} contact{list.length!==1?"s":""}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ background:`${cc}18`, color:cc, fontSize:13,
                                   padding:"3px 12px", borderRadius:20,
                                   fontFamily:"sans-serif", fontWeight:700 }}>{list.length}</span>
                    <span style={{ color:TEXT3, fontSize:14 }}>{isOpen?"▲":"▼"}</span>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ borderTop:`1px solid ${BORDER}` }}>
                    <table style={{ width:"100%", borderCollapse:"collapse" }}>
                      <thead>
                        <tr style={{ borderBottom:`1px solid ${BORDER}`, background:DARK_CARD2 }}>
                          {["Name","Company","Email","Phone","Added"].map(h=>(
                            <th key={h} style={{ padding:"10px 16px", textAlign:"left",
                                                 fontFamily:"sans-serif", fontSize:10,
                                                 color:cc, letterSpacing:2, textTransform:"uppercase", fontWeight:700 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((c,i)=>(
                          <tr key={c.id} style={{ background:i%2===0?"transparent":DARK_CARD2, borderBottom:`1px solid ${BORDER}` }}>
                            <td style={{ padding:"10px 16px", fontFamily:"sans-serif", fontWeight:700, color:TEXT1 }}>{c.name}</td>
                            <td style={{ padding:"10px 16px", fontFamily:"sans-serif", fontSize:13, color:TEXT2 }}>{c.company}</td>
                            <td style={{ padding:"10px 16px" }}>
                              {c.email?<a href={`mailto:${c.email}`} style={{ color:T, fontFamily:"sans-serif", fontSize:13, textDecoration:"none" }}>{c.email}</a>:<span style={{color:TEXT3}}>—</span>}
                            </td>
                            <td style={{ padding:"10px 16px", fontFamily:"sans-serif", fontSize:13, color:TEXT2 }}>{c.phone||<span style={{color:TEXT3}}>—</span>}</td>
                            <td style={{ padding:"10px 16px", fontFamily:"sans-serif", fontSize:11, color:TEXT3 }}>{c.updated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
function Export({ athletes, contacts }) {
  const [type,setType]=useState("athletes");
  const [fL,setFL]=useState(""); const [fS,setFS]=useState(""); const [fCat,setFCat]=useState("");
  const [done,setDone]=useState(false);

  const filtered = useMemo(()=>{
    if(type==="athletes") return athletes.filter(a=>(!fL||a.league===fL)&&(!fS||a.status===fS));
    return contacts.filter(c=>!fCat||c.category===fCat);
  },[type,athletes,contacts,fL,fS,fCat]);

  const doExport = () => {
    let rows, filename;
    if(type==="athletes"){
      rows=[["Name","Team","League","Agency","Agent","Email","Status","Updated"],
            ...filtered.map(a=>[a.name,a.team||"",a.league,a.agency,a.agent,a.email,a.status,a.updated])];
      filename=`atlaua-athletes-${TODAY}.csv`;
    } else {
      rows=[["Name","Company","Category","Email","Phone","Added"],
            ...filtered.map(c=>[c.name,c.company||"",c.category,c.email||"",c.phone||"",c.updated])];
      filename=`atlaua-contacts-${TODAY}.csv`;
    }
    const csv=rows.map(r=>r.map(v=>`"${(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const b=new Blob([csv],{type:"text/csv"});
    const x=document.createElement("a");x.href=URL.createObjectURL(b);x.download=filename;x.click();
    setDone(true); setTimeout(()=>setDone(false),3000);
  };

  const doExportAll = () => {
    const rows=[
      ["Type","Name","Team/Company","League/Category","Agency","Agent/Contact","Email","Status/Phone","Updated"],
      ...athletes.map(a=>["Athlete",a.name,a.team||"",a.league,a.agency,a.agent,a.email,a.status,a.updated]),
      ...contacts.map(c=>["Contact",c.name,c.company||"",c.category,"","",c.email||"",c.phone||"",c.updated])
    ];
    const csv=rows.map(r=>r.map(v=>`"${(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const b=new Blob([csv],{type:"text/csv"});
    const x=document.createElement("a");x.href=URL.createObjectURL(b);x.download=`atlaua-full-${TODAY}.csv`;x.click();
  };

  const sel={padding:"9px 12px",borderRadius:8,border:`1px solid ${BORDER}`,
             background:DARK_CARD2,color:TEXT1,fontFamily:"sans-serif",fontSize:13,cursor:"pointer",outline:"none",width:"100%"};

  return (
    <div>
      <SectionTitle title="Export" sub="Download your CRM data as CSV"/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:24 }}>
        <GlassCard style={{ padding:22 }}>
          <div style={{ fontSize:10,color:TEXT3,letterSpacing:2,textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:16,fontWeight:700 }}>Data Type</div>
          <div style={{ display:"flex",gap:10,marginBottom:18 }}>
            {[["athletes","🏃 Athletes"],["contacts","👤 Contacts"]].map(([v,l])=>(
              <button key={v} onClick={()=>{setType(v);setFL("");setFS("");setFCat("");}} style={{
                flex:1,padding:"11px 0",borderRadius:10,cursor:"pointer",
                border:`2px solid ${type===v?T:BORDER}`,
                background:type===v?`${T}15`:"transparent",
                color:type===v?T:TEXT2,
                fontFamily:"sans-serif",fontWeight:700,fontSize:14,transition:"all 0.15s"
              }}>{l}</button>
            ))}
          </div>
          {type==="athletes"?<>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:TEXT3,letterSpacing:2,textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:6,fontWeight:700}}>League</div>
              <select value={fL} onChange={e=>setFL(e.target.value)} style={sel}>
                <option value="">All Leagues</option>{LEAGUES.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:10,color:TEXT3,letterSpacing:2,textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:6,fontWeight:700}}>Status</div>
              <select value={fS} onChange={e=>setFS(e.target.value)} style={sel}>
                <option value="">All Statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </>:<>
            <div>
              <div style={{fontSize:10,color:TEXT3,letterSpacing:2,textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:6,fontWeight:700}}>Category</div>
              <select value={fCat} onChange={e=>setFCat(e.target.value)} style={sel}>
                <option value="">All Categories</option>
                {["Distributor","Brand","Media","Partner","Other"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </>}
        </GlassCard>

        <GlassCard style={{ padding:22, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <div style={{fontSize:10,color:TEXT3,letterSpacing:2,textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:16,fontWeight:700}}>Summary</div>
            {[[`${filtered.length} records`,"to export"],[`${type==="athletes"?8:6} columns`,"included"],["CSV · UTF-8","format"]].map(([v,l])=>(
              <div key={v} style={{ display:"flex",justifyContent:"space-between",padding:"10px 14px",
                                    background:DARK_CARD2,borderRadius:8,marginBottom:8 }}>
                <span style={{fontFamily:"sans-serif",fontSize:13,color:TEXT2}}>{l}</span>
                <span style={{fontFamily:"Georgia,serif",fontSize:15,color:T,fontWeight:700}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:16}}>
            <Btn onClick={doExport} color={done?GREEN:T} style={{width:"100%",padding:"13px"}}>
              {done?"✓ Downloaded!":"↓ Export CSV"}
            </Btn>
            <Btn outline color={W} onClick={doExportAll} style={{width:"100%"}}>
              ↓ Export Everything (Athletes + Contacts)
            </Btn>
          </div>
        </GlassCard>
      </div>

      {/* Preview */}
      <GlassCard style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 20px", borderBottom:`1px solid ${BORDER}`,
                      display:"flex", alignItems:"center", gap:8 }}>
          <span style={{fontSize:10,color:TEXT3,letterSpacing:2,textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:700}}>Data Preview</span>
          <span style={{background:`${T}18`,color:T,fontSize:11,padding:"2px 10px",borderRadius:20,fontFamily:"sans-serif",fontWeight:700}}>First 5 rows</span>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${BORDER}`, background:DARK_CARD2 }}>
                {(type==="athletes"?["Name","Team","League","Agency","Agent","Email","Status","Updated"]:["Name","Company","Category","Email","Phone","Added"]).map(h=>(
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontFamily:"sans-serif",
                                       fontSize:10, color:T, letterSpacing:2, textTransform:"uppercase", fontWeight:700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0,5).length===0
                ? <tr><td colSpan={8} style={{padding:"30px",textAlign:"center",fontFamily:"sans-serif",color:TEXT3,fontSize:14}}>No data with current filters.</td></tr>
                : filtered.slice(0,5).map((row,i)=>(
                  <tr key={i} style={{ background:i%2===0?"transparent":DARK_CARD2, borderBottom:`1px solid ${BORDER}` }}>
                    {(type==="athletes"
                      ?[row.name,row.team||"—",row.league,row.agency,row.agent,row.email,row.status,row.updated]
                      :[row.name,row.company||"—",row.category,row.email||"—",row.phone||"—",row.updated]
                    ).map((v,j)=>(
                      <td key={j} style={{ padding:"9px 14px", fontFamily:"sans-serif", fontSize:12,
                                           color:TEXT2, maxWidth:140, overflow:"hidden",
                                           textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v}</td>
                    ))}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const NAV = [
  { id:"Dashboard", ic:"⬡" },
  { id:"Athletes",  ic:"◉" },
  { id:"Agencies",  ic:"◎" },
  { id:"Teams",     ic:"◍" },
  { id:"Pipeline",  ic:"▤" },
  { id:"Contacts",  ic:"◫" },
  { id:"Export",    ic:"↓" },
];

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function App() {
  const [athletes, setAthletes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [page,     setPage]     = useState("Dashboard");
  const [sel,      setSel]      = useState(null);
  const [showAdd,  setShowAdd]  = useState(false);
  const [loading,  setLoading]  = useState(true);

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      const [{ data:ath },{ data:con }] = await Promise.all([
        supabase.from("athletes").select("*").order("id"),
        supabase.from("contacts").select("*").order("id"),
      ]);
      if(ath) setAthletes(ath);
      if(con) setContacts(con);
      setLoading(false);
    })();
  },[]);

  const upd = useCallback(async(id,u)=>{
    setAthletes(p=>p.map(a=>a.id===id?{...a,...u}:a));
    setSel(p=>p?.id===id?{...p,...u}:p);
    await supabase.from("athletes").update(u).eq("id",id);
  },[]);

  const addNew = async(item, type)=>{
    if(type==="contact"){
      const { data }=await supabase.from("contacts").insert([item]).select();
      if(data) setContacts(p=>[...p,data[0]]);
    } else {
      const { data }=await supabase.from("athletes").insert([item]).select();
      if(data) setAthletes(p=>[...p,data[0]]);
    }
  };

  const importBatch = async(items, type)=>{
    const table = type==="contacts"?"contacts":"athletes";
    const { data }=await supabase.from(table).insert(items).select();
    if(data){
      if(type==="contacts") setContacts(p=>[...p,...data]);
      else setAthletes(p=>[...p,...data]);
    }
  };

  const agCount = new Set(athletes.map(a=>a.agency).filter(Boolean)).size;

  if(loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                  height:"100vh", background:DARK_BG, flexDirection:"column", gap:20 }}>
      <AtlauaLogo size={52}/>
      <div style={{ fontFamily:"Georgia,serif", color:TEXT1, fontSize:28,
                    fontWeight:700, letterSpacing:4 }}>ATLAUA</div>
      <div style={{ fontFamily:"sans-serif", color:TEXT3, fontSize:10,
                    letterSpacing:4, textTransform:"uppercase" }}>Loading…</div>
    </div>
  );

  return (
    <div style={{ display:"flex", height:"100vh", background:DARK_BG, overflow:"hidden" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width:220, background:DARK_SB, display:"flex", flexDirection:"column",
        flexShrink:0, borderRight:`1px solid ${BORDER}`
      }}>
        {/* Logo */}
        <div style={{ padding:"24px 22px 20px", borderBottom:`1px solid ${BORDER}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
            <AtlauaLogo size={32}/>
            <div>
              <div style={{ fontFamily:"Georgia,serif", fontWeight:700, letterSpacing:3,
                            color:TEXT1, fontSize:15, lineHeight:1 }}>ATLAUA</div>
              <div style={{ fontFamily:"sans-serif", color:T, fontSize:8,
                            letterSpacing:3, marginTop:4, textTransform:"uppercase", opacity:.8 }}>GOD OF WATER</div>
            </div>
          </div>
          <div style={{ height:1, background:`linear-gradient(to right,${T}55,transparent)` }}/>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"10px 10px" }}>
          {NAV.map(({ id, ic })=>{
            const on = page===id;
            return (
              <div key={id} onClick={()=>setPage(id)} style={{
                display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                borderRadius:10, cursor:"pointer", marginBottom:2,
                background: on?`${T}18`:"transparent",
                borderLeft:`3px solid ${on?T:"transparent"}`,
                transition:"all 0.15s"
              }}
              onMouseEnter={e=>{ if(!on) e.currentTarget.style.background=`${T}08`; }}
              onMouseLeave={e=>{ if(!on) e.currentTarget.style.background="transparent"; }}>
                <span style={{ fontSize:13, color:on?T:TEXT3, width:16, textAlign:"center" }}>{ic}</span>
                <span style={{ fontFamily:"sans-serif", fontSize:13, fontWeight:on?700:400,
                               color:on?TEXT1:TEXT2, letterSpacing:.2 }}>{id}</span>
                {on && <div style={{ marginLeft:"auto", width:5, height:5, borderRadius:"50%",
                                     background:T, boxShadow:`0 0 8px ${T}` }}/>}
              </div>
            );
          })}
        </nav>

        {/* Footer stats */}
        <div style={{ padding:"14px 22px", borderTop:`1px solid ${BORDER}` }}>
          <div style={{ fontFamily:"sans-serif", fontSize:9, color:TEXT3,
                        letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>
            {athletes.length} Athletes · {agCount} Agencies
          </div>
          <div style={{ fontFamily:"sans-serif", fontSize:9, color:TEXT3, letterSpacing:1 }}>
            ATLAUA CRM v3.0
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex:1, overflowY:"auto", padding:"32px 38px", background:DARK_BG }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          {page==="Dashboard" && <Dashboard athletes={athletes}/>}
          {page==="Athletes"  && <Athletes  athletes={athletes} onSelect={setSel} onImport={importBatch}/>}
          {page==="Agencies"  && <Agencies  athletes={athletes} onSelect={setSel}/>}
          {page==="Teams"     && <Teams     athletes={athletes} onSelect={setSel}/>}
          {page==="Pipeline"  && <Pipeline  athletes={athletes} onUpdate={upd} onSelect={setSel}/>}
          {page==="Contacts"  && <Contacts  contacts={contacts} onImport={importBatch}/>}
          {page==="Export"    && <Export    athletes={athletes} contacts={contacts}/>}
        </div>
      </main>

      {/* ── FAB ── */}
      <button onClick={()=>setShowAdd(true)} style={{
        position:"fixed", bottom:30, right:30, width:52, height:52,
        borderRadius:"50%", background:`linear-gradient(135deg,${T},${T}CC)`,
        color:DARK_BG, border:"none", fontSize:26, cursor:"pointer",
        boxShadow:`0 6px 28px ${T}55`, zIndex:50, display:"flex",
        alignItems:"center", justifyContent:"center", fontWeight:300,
        transition:"transform 0.2s, box-shadow 0.2s"
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.12)"; e.currentTarget.style.boxShadow=`0 10px 36px ${T}77`; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)";    e.currentTarget.style.boxShadow=`0 6px 28px ${T}55`; }}>
        +
      </button>

      {sel      && <Panel    a={sel} onClose={()=>setSel(null)} onSave={upd}/>}
      {showAdd  && <AddModal athletes={athletes} onClose={()=>setShowAdd(false)} onAdd={addNew}/>}
    </div>
  );
}
