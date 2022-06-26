import{_ as s,d as a}from"./app.3498ee08.js";const n={},e=a(`<h1 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> Links</h1><p>Links allow you to express relationships between objects \u2014 such as the author (User) of a Comment, or the Post the comment belongs to. You can express 1:1, 1:n, n:n relationships with Isar links.</p><h2 id="isarlink" tabindex="-1"><a class="header-anchor" href="#isarlink" aria-hidden="true">#</a> IsarLink</h2><p><code>IsarLink&lt;T&gt;</code> can contain zero or one related objects so it can be used to express a to-one relationship. <code>IsarLink</code> has a single property called <code>value</code> which holds the linked object.</p><p>Links are lazy so you need to explicitly tell the <code>IsarLink</code> to load or save the <code>value</code>. You can do this by calling <code>linkProperty.load()</code> and <code>linkProperty.save()</code>.</p><p>Let&#39;s start by adding an IsarLink to a collection:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">@Collection</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#C678DD;">class</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Teacher</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">int</span><span style="color:#C678DD;">?</span><span style="color:#ABB2BF;"> id;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">late</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">String</span><span style="color:#ABB2BF;"> subject;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">@Collection</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#C678DD;">class</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Student</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">int</span><span style="color:#C678DD;">?</span><span style="color:#ABB2BF;"> id;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">late</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">String</span><span style="color:#ABB2BF;"> name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> teachers </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">IsarLink</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Teacher</span><span style="color:#ABB2BF;">&gt;();</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre></div><p>We defined a link between teachers and students. Every student can have exactly one teacher in this example. We call the link <code>teachers</code> for the example in the next section.</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> mathTeacher </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Teacher</span><span style="color:#ABB2BF;">()..subject </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;Math&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> linda </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Student</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">  ..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;Linda&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">  ..teachers.value </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> mathTeacher;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.</span><span style="color:#61AFEF;">writeTxn</span><span style="color:#ABB2BF;">((isar) </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.students.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(linda);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span></code></pre></div><p>First we create a the teacher and assign it to a student. As you can see in this example, we have to <code>put()</code> the student manually (obviously) but the link is saved automatically and also takes care of adding the <code>mathTeacher</code> to the database.</p><p>Later, we change the link value and save it in a write transaction.</p><h2 id="isarlinks" tabindex="-1"><a class="header-anchor" href="#isarlinks" aria-hidden="true">#</a> IsarLinks</h2><p>It would make more sense if the student from the previous example could have multiple teachers. Fortunately Isar has <code>IsarLinks&lt;T&gt;</code> which can contain multiple related objects and express a to-many relationship.</p><p><code>IsarLinks&lt;T&gt;</code> extends <code>Set&lt;T&gt;</code> so it exposes all the methods that are allowed for sets.</p><p><code>IsarLinks</code> behaves much like <code>IsarLink</code> and is also lazy. To load all linked object call <code>linkProperty.load()</code>. To persist the changes call <code>linkProperty.save()</code>.</p><p>Internally both <code>IsarLink</code> and <code>IsarLinks</code> are represented in the same way. This allows us to upgrade the <code>IsarLink&lt;Teacher&gt;</code> from before to an <code>IsarLinks&lt;Teacher&gt;</code> to assign multiple teachers to a single student (without losing data).</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">@Collection</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#C678DD;">class</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Student</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">int</span><span style="color:#C678DD;">?</span><span style="color:#ABB2BF;"> id;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">late</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">String</span><span style="color:#ABB2BF;"> name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> teachers </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">IsarLinks</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Teacher</span><span style="color:#ABB2BF;">&gt;();</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre></div><p>This works because we did not change the name of the link (<code>teachers</code>) so Isar remembers it from before.</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> englishTeacher </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Teacher</span><span style="color:#ABB2BF;">()..subject </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;English&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> linda </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> isar.students.</span><span style="color:#61AFEF;">where</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">filter</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">nameEqualTo</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;Linda&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">findFirst</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> linda.teachers.</span><span style="color:#61AFEF;">load</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(linda.teachers); </span><span style="color:#7F848E;font-style:italic;">// {Teacher(&#39;Math&#39;)}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">linda.teachers.</span><span style="color:#61AFEF;">add</span><span style="color:#ABB2BF;">(englishTeacher);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.</span><span style="color:#61AFEF;">writeTxn</span><span style="color:#ABB2BF;">((isar) </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> linda.teachers.</span><span style="color:#61AFEF;">save</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(linda.teachers); </span><span style="color:#7F848E;font-style:italic;">// {Teacher(&#39;Math&#39;), Teacher(&#39;English&#39;)}</span></span>
<span class="line"></span></code></pre></div><h2 id="backlinks" tabindex="-1"><a class="header-anchor" href="#backlinks" aria-hidden="true">#</a> Backlinks</h2><p>I hear you ask &quot;What if we want to express reverse relationships?&quot;. Don&#39;t worry, we&#39;ll now introduce backlinks.</p><p>Backlinks are links in reverse direction. Each link always has an implicit backlink. You can make it available to your app by annotating an <code>IsarLink</code> or <code>IsarLinks</code> with <code>@Backlink()</code>.</p><p>Backlinks do not require additional memory or resources and you can freely add, remove and rename them without losing data.</p><p>We want to know which students a specific teacher has so we define a backlink:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">@Collection</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#C678DD;">class</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Teacher</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">int</span><span style="color:#C678DD;">?</span><span style="color:#ABB2BF;"> id;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">late</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">String</span><span style="color:#ABB2BF;"> subject;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">@Backlink</span><span style="color:#ABB2BF;">(to</span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;teachers&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> students </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">IsarLinks</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Student</span><span style="color:#ABB2BF;">&gt;();</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre></div><p>We need to specify the link to which the backlink points. It is possible to have multiple different links between two objects.</p><h2 id="initialize-links" tabindex="-1"><a class="header-anchor" href="#initialize-links" aria-hidden="true">#</a> Initialize links</h2><p><code>IsarLink</code> and <code>IsarLinks</code> both have a zero-arg constructor which should be used to assign the link property when the object is created. It is good practice to make link properties <code>final</code>.</p><p>When you <code>put()</code> your object for the first time, the link gets initialized with source and target collection and you can call methods like <code>load()</code> and <code>save()</code>. A link starts tracking changes immediately after its creation so you can add and remove relations even before the link is initialized.</p><p>It is illegal to move a link to another object and will lead to undefined behavior.</p>`,30);function l(o,p){return e}var c=s(n,[["render",l],["__file","links.html.vue"]]);export{c as default};
