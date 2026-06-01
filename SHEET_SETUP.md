# Google Sheet Setup

## 1. Create the sheet

Go to https://sheets.google.com → New spreadsheet → rename it "PS6 After School — Content CMS"

## 2. Share it

Click Share → Change to "Anyone with the link" → Viewer

## 3. Get the Sheet ID

From the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
Copy that ID into `.env.local` as `GOOGLE_SHEET_ID=`

Also add it in Vercel: Project Settings → Environment Variables

## 4. Create 5 tabs (sheets)

Rename "Sheet1" to `general`, then add 4 more tabs:
`key_dates` · `programs` · `providers` · `offsite`

---

## Tab: general

Columns: `key` | `value`

| key | value |
|-----|-------|
| overview | After School offers families supplemental programming for grades PreK through 5, across STEM, the visual arts, the performing arts, sports, dance, language, debate, music, chess, and more. |
| location_days | All classes at PS 6\nK–5: Mon–Fri · PreK: Tue–Fri\nFollows DOE calendar |
| dismissal_times | K–5: 2:30–5:00 PM\nExtended pickup until 5:45 (no extra charge)\nPreK: 2:30–4:00 PM · No extended day |
| pickup_locations | K–5: School Yard (82nd St)\nPreK: Rotunda Doors (81st St) |
| nurse | Nurse Sarah is available daily from 2:30–4:00 PM |
| semester_dates | Fall 2025: Sep 4 – Jan 20\nSpring 2026: Feb 2 – Jun 18 |
| snacks | Please send a nut-free snack with your child |
| scholarships | Please adhere to the scholarship request instructions provided by each provider, or email the provider for the class you are interested in and copy the After School Coordinator. The After School team works collaboratively with providers on scholarship and financial aid matters to best support families in need of assistance. |
| refund_policy | Providers may issue pro-rated refunds upon request, minus the processing fee and cost of any classes that took place before the request. Refund requests must be submitted by February 14, 2026. |

---

## Tab: key_dates

Columns: `date` | `event`

| date | event |
|------|-------|
| November 17, 2025 | Zoom Fair Recording available |
| December 2, 2025 | Registration opens |
| January 3, 2026 | Under-enrolled classes close |
| January 30, 2026 | Fall semester ends |
| February 2, 2026 | Spring semester begins |
| February 14, 2026 | Final refund deadline |
| May 28, 2026 | After School Zoom Fair for Fall 2026 |
| June 2, 2026 | Fall 2026 enrollment opens |
| June 18, 2026 | Last day of After School |

---

## Tab: programs

Columns: `category` | `provider` | `name` | `grades` | `days` | `is_new`

Valid category values: SPORTS · PERFORMING ARTS · STEAM/ARTS · STEM/CODING · CHESS · DEBATE · ACADEMIC · LANGUAGE
`is_new`: true or false

| category | provider | name | grades | days | is_new |
|----------|----------|------|--------|------|--------|
| SPORTS | Big Apple Youth Sports | Tennis / Strength & Motor Skills | Grades 1-3 | Monday | false |
| SPORTS | Big Apple Youth Sports | Tennis 2 Advanced | Grades 3-5 | Monday | false |
| SPORTS | Big Apple Youth Sports | Introduction to Co-Ed Youth Sports | K-2 | Tuesday & Thursday | false |
| SPORTS | Big Apple Youth Sports | Flag Football · Baseball · Pickleball | Grades 2-5 | Monday | false |
| SPORTS | Big Apple Youth Sports | Soccer League | Grades 3-5 | Tuesday | false |
| SPORTS | Big Apple Youth Sports | Basketball Skill Development | Grades 3-5 | Wednesday | false |
| SPORTS | Big Apple Youth Sports | All-Girls Sports Tournament | Grades 2-5 | Wednesday | false |
| SPORTS | Big Apple Youth Sports | PreK Sports | PreK | Wednesday | false |
| SPORTS | Big Apple Youth Sports | Intramural Sports Co-Ed Tournament | Grades 2-5 | Friday | false |
| SPORTS | Aurora Skills | Martial Arts | K-2 | Tuesday | false |
| SPORTS | Kennebec Kicks | Run Club | Grades 3-5 | Thursday | false |
| PERFORMING ARTS | Broadway Bound Kids | Broadway Bound Beginners | PreK | Wednesday | false |
| PERFORMING ARTS | Broadway Bound Kids | Jr. Mix It Up Dance | K-1 | Monday | false |
| PERFORMING ARTS | Broadway Bound Kids | Mix It Up Dance | Grades 2-5 | Monday | false |
| PERFORMING ARTS | Broadway Bound Kids | Storytelling Playhouse | K-1 | Tuesday | false |
| PERFORMING ARTS | Broadway Bound Kids | Sketch Comedy | Grades 2-5 | Tuesday | false |
| PERFORMING ARTS | Broadway Bound Kids | Art and Acting | K-1 | Wednesday | false |
| PERFORMING ARTS | Broadway Bound Kids | Singer/Songwriter | Grades 2-5 | Wednesday | false |
| PERFORMING ARTS | Broadway Bound Kids | Drama Club Players | K-1 | Thursday | false |
| PERFORMING ARTS | Broadway Bound Kids | Drama Club Workshop | Grades 2-3 | Thursday | false |
| PERFORMING ARTS | Broadway Bound Kids | Drama Club Company | Grades 4-5 | Thursday | false |
| PERFORMING ARTS | Broadway Bound Kids | Wee Ballet | PreK | Friday | true |
| PERFORMING ARTS | Broadway Bound Kids | PS6's Got Talent! | K-5 | Friday | false |
| PERFORMING ARTS | iPianoLab | Group Piano Class | K-5 | Tuesday & Friday | false |
| STEAM/ARTS | Aurora Skills | Intro to Scratch Coding | K-2 | Monday | false |
| STEAM/ARTS | Aurora Skills | Lego Robotics | K-3 | Monday | false |
| STEAM/ARTS | Aurora Skills | Young Scientist | K-3 | Tuesday | false |
| STEAM/ARTS | The Art Farm | Working with Wildlife – Live Animal Science | K-2 & 3-5 | Monday | false |
| STEAM/ARTS | The Art Farm | Critters & Crafts | PreK | Tuesday | false |
| STEAM/ARTS | The Art Farm | Explore with Art | K-1 | Wednesday | false |
| STEAM/ARTS | The Art Farm | Amazing Animal Adaptations | K-5 | Tuesday | false |
| STEAM/ARTS | The Art Farm | Art for Creative Kids | K-5 | Thursday | false |
| STEAM/ARTS | The Art Farm | Culinary Kids Cooking Class | K-2 & 3-5 | Friday | false |
| STEAM/ARTS | The Art Farm | Mini Masterpieces – Advanced Art | Grades 1-5 | Wednesday | false |
| STEAM/ARTS | The Craft Studio | Coolest Crafters | K-3 | Tuesday | false |
| STEAM/ARTS | DramaZone | Knitting and Fashion Design | Grades 2-5 | Wednesday | true |
| STEAM/ARTS | Color Pop | Fine Art: Creative Journey Through Art Mediums | K-2 | Friday | true |
| STEAM/ARTS | Kids in Design | Fantastic Structures | K-5 | Wednesday | false |
| STEAM/ARTS | Kids in Design | Innovation Lab | K-5 | Friday | false |
| STEM/CODING | Launch Math + Science | Mini Mathematicians | PreK | Thursday | false |
| STEM/CODING | Launch Math + Science | Math Mania! | K-2 | Tuesday | false |
| STEM/CODING | Launch Math + Science | I Wanna Be... A Marine Biologist! | K-2 | Monday | false |
| STEM/CODING | Launch Math + Science | I Wanna Be... A Detective! | K-2 | Wednesday | false |
| STEM/CODING | Launch Math + Science | Little Astronauts! | PreK | Friday | true |
| STEM/CODING | Launch Math + Science | Coding + Robot Adventures | K-2 | Thursday | false |
| STEM/CODING | Launch Math + Science | STEM All-Stars | K-2 | Friday | false |
| STEM/CODING | Launch Math + Science | Coding AI with Scratch | Grades 3-5 | Monday | false |
| STEM/CODING | Launch Math + Science | Biorobotics: Machines Among Us | Grades 3-5 | Tuesday | true |
| STEM/CODING | Launch Math + Science | Coding + Digital Design | Grades 3-5 | Wednesday | false |
| STEM/CODING | Launch Math + Science | Freaky Forces + Elusive Energies | Grades 3-5 | Thursday | false |
| STEM/CODING | Launch Math + Science | Kids Crime Lab | Grades 3-5 | Friday | false |
| STEM/CODING | Launch Math + Science | Future Medical Doctor Club | Grades 3-5 | Thursday | false |
| CHESS | Chess Educators | Chess I | K-5 | Wednesday & Friday | false |
| CHESS | Chess Educators | Chess II | K-5 | Wednesday & Friday | false |
| CHESS | Chess Educators | Chess III | K-5 | Wednesday & Friday | false |
| DEBATE | DramaZone | Policy Debate 2 | Grades 2-5 | Monday | false |
| ACADEMIC | Aurora Skills | Little Bulls & Bears (Financial Literacy) | K-1 | Monday | true |
| ACADEMIC | Aurora Skills | Junior Bulls & Bears (Financial Literacy) | Grades 2-3 | Tuesday | true |
| ACADEMIC | Aurora Skills | Senior Bulls & Bears (Financial Literacy) | Grades 4-5 | Thursday | true |
| LANGUAGE | Spanish at PS6 | Spanish Starters | K-5 | Thursday | false |
| LANGUAGE | Spanish at PS6 | Next Steps in Español | K-5 | Thursday | false |
| LANGUAGE | EFNY | French 1 | K-5 | Wednesday | false |
| LANGUAGE | EFNY | French 2 | K-5 | Wednesday | false |
| LANGUAGE | EFNY | French 3 | K-5 | Wednesday | false |

---

## Tab: providers

Columns: `category` | `name` | `contact` | `email` | `description` | `website` | `register_url` | `register_url_2` | `register_url_3` | `register_label` | `register_label_2` | `register_label_3`

Leave unused `register_url_*` / `register_label_*` columns blank.

| category | name | contact | email | description | website | register_url | register_url_2 | register_label | register_label_2 |
|----------|------|---------|-------|-------------|---------|-------------|----------------|----------------|-----------------|
| SPORTS | Big Apple Youth Sports | | info@bigappleyouthsports.net | Has been offering sports after school at PS6 for decades, from general mixed sports to specific leagues | bigappleyouthsports.net/ps6-81st-btwn-mad-and-park | fs30.formsite.com/bigappleyouthsports/form1/index | | Register | |
| STEM | Aurora Skills Inc. | | afterschool@auroraskills.com | Has been offering after school classes at PS6 for decades, across STEAM and movement | auroraskills.com | auroraskills.com/spring-2026-registration/ | | Register | |
| STEM | Kids in Design | Julia Gorodetsky | juliagorodetsky@gmail.com | Offers specialized classes in architecture, engineering, and design | kidsindesign.com | kidsindesign.com/ps-6-fall-2025-architecture-registration | kidsindesign.com/about/ps-6-fall-2025-innovation-lab-registration | Fantastic Structures | Innovation Lab |
| STEM | Launch Math + Science Centers | Scott Heifetz | scott@launchmath.com | Founded by a real-life rocket scientist, Launch offers fun, exciting math and science classes | | launchmath.asapconnected.com | launchmath.asapconnected.com | K-2 | Grades 3-5 |
| ARTS | The Art Farm | Erin Hamilton | erin@theartfarms.com | Offers art and natural science classes, many of which include their incredible array of live animals | theartfarms.com/afterschool-programs-ps6/ | app.amilia.com/store/en/the-art-farm-nyc/shop/programs/90303 | | Register | |
| ARTS | The Craft Studio | Noreen Carruthers or Ian Peers | craftstudiony@gmail.com | A local UES institution, offers cool crafting and art classes | craftstudionyc.com | | | | |
| ARTS | ColorPop Workshop | Jessica Beierle | jessica@colorpopworkshop.com | Offers dynamic, curriculum-based art and crafting classes designed to inspire imagination | colorpopworkshop.com | hisawyer.com/colorpop-workshop/schedules/activity-set/1704158 | | Register | |
| CHESS | Chess Educators | Mrs. Martinez | chesseducators@gmail.com | Has been teaching chess at PS6 for decades, and builds skill, strategy, and fun for players of all levels | chesseducators.com/chess-and-education-at-ps-6/ | chesseducators.com/chess-and-education-ps-6-registration/ | | Register | |
| DEBATE | DramaZone | Laura Brown | laurabrown@dramazonenyc.com | Teaches debate at schools across NYC, and makes the subject approachable for kids of all ages | dramazonenyc.com | dramazonenyc.com/dzfa-classes-magenta/ | | Register | |
| LANGUAGE | EFNY | Christine Giorgis | cgiorgis@efny.net | Teaches French to both native speakers and new learners, in schools across NYC | efny.net/enrichment-program/schools/ps-6-upper-east-side/ | | | | |
| LANGUAGE | Spanish at PS6 | | info@spanishat6.com | Teaches Spanish language and culture to both native speakers and new learners, taught by PS6 teachers | spanishat6.com | fs11.formsite.com/zII9NA/5mguonrrxh/index | | Register | |
| PERFORMANCE | Broadway Bound Kids | Sam Blain / Samantha Parrish-Khan | sam@broadwayboundkids.org | Teaches acting, singing, dancing, comedy, and performing of all kinds in a supportive, fun, and intentional environment | broadwayboundkids.org/ps-6 | pci.jotform.com/form/253095673492163 | | Register | |
| PERFORMANCE | iPianoLab | Steve Catanzaro | steve@ipianolab.com | Teaches keyboard to kids in a fun way, through songs that they love and methods that make it easy | ipianolab.com | ipianolab.com/nyc/ps-6-lillie-d-blake-school-tuesdays | ipianolab.com/nyc/ps-6-lillie-d-blake-school-fridays | Tuesdays | Fridays |

---

## Tab: offsite

Columns: `name` | `description` | `pickup` | `dismissal` | `phone` | `website` | `register_url`

| name | description | pickup | dismissal | phone | website | register_url |
|------|-------------|--------|-----------|-------|---------|-------------|
| Kennebec Kicks Run Club | Gently builds your child's speed and endurance in a fun and supportive team setting. Practices in Central Park. | PS6 at 2:30 PM | 4:00 PM — Fine Cleaners & Tailors, 30 East 81st Street | | kennebeckicksrunclub.com | kennebeckicksrunclub.com/p/kicks-run-club-registration/ |
| 92Y Noar After-School Program | Provides transportation from neighborhood schools including chaperoned bus service from PS6. Children can attend one to five days per week. Serves K–6th grade. | Chaperoned bus from PS6 | 3:00–6:00 PM | (212) 415-5624 | 92y.org/Noar | |

---

## Editing tips for non-technical staff

- To update a date or description: click the cell, type, press Enter
- To add a new program: add a new row in the `programs` tab — same columns
- To mark a class as new: type `true` in the `is_new` column
- To remove a program: delete its row
- **Multi-line card content** (location_days, dismissal_times, etc.): press **Alt+Enter** inside the cell to add a new line. First line appears bold/primary; additional lines appear lighter below it.
- Changes go live on the website within 1 hour automatically
- If you need changes live immediately: ask a developer to trigger a Vercel redeploy
