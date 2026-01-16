# 📱 Mobile-First Patterns: Breadcrumbs, Search & View Switcher

## Overview
Best practices for responsive breadcrumbs, search, and view switchers based on **Material Design 3**, **Carbon Design System**, **Tailwind CSS**, and **Shopify Polaris**.

---

## 🎯 The Problem

Your current layout has three key elements that need mobile-first patterns:

```
Desktop Layout:
┌─────────────────────────────────────────────────────┐
│ Workspaces / UPS US        [Search....]  [Grid] [Tree] │
│ UPS US                                                  │
│ [Expand All] [Collapse All]                            │
└─────────────────────────────────────────────────────┘
```

**Issues on Mobile:**
- ❌ Breadcrumbs take too much horizontal space
- ❌ Search bar + view switcher can't fit on one line
- ❌ Large title + actions create cramped layout
- ❌ Expand/Collapse buttons are secondary but take prime space

---

## ✅ Solution: Material Design 3 Pattern (Recommended)

### Mobile (< 640px)
```
┌────────────────────────┐
│ [←] UPS US        [🔍] │
│ [Grid icon] [Tree icon] [⋮] │
└────────────────────────┘
```

**Key Changes:**
- ✅ **Back button** replaces breadcrumbs
- ✅ **Search icon** opens full-screen modal
- ✅ **Icon-only view switcher** saves space
- ✅ **Overflow menu** hides Expand/Collapse

### Tablet (640px - 1023px)
```
┌──────────────────────────────────────┐
│ Workspaces / UPS US    [Search...]   │
│ UPS US          [Grid] [Tree]        │
└──────────────────────────────────────┘
```

**Key Changes:**
- ✅ **Breadcrumb trail** appears
- ✅ **Inline search bar** (narrow)
- ✅ **View switcher with labels**

### Desktop (1024px+)
```
┌───────────────────────────────────────────────────┐
│ Workspaces / UPS US      [Search......] [Grid] [Tree] │
│ UPS US                  [Expand All] [Collapse All]    │
└───────────────────────────────────────────────────┘
```

**Key Changes:**
- ✅ **Full layout** with all features
- ✅ **Wide search bar**
- ✅ **Expand/Collapse visible**

---

## 🎨 Design System Patterns

### 1. Material Design 3 (Google)

#### Breadcrumbs
```css
/* Mobile: Hide breadcrumbs, show back button */
@media (max-width: 639px) {
  .breadcrumb-nav { display: none; }
  .back-button { display: flex; }
}

/* Tablet+: Show breadcrumbs, hide back button */
@media (min-width: 640px) {
  .breadcrumb-nav { display: flex; }
  .back-button { display: none; }
}
```

**Rationale:**
- Back button is **universally understood** on mobile
- Breadcrumbs are **more useful on larger screens** where context matters
- **Saves 80-100px** of horizontal space on mobile

#### Search
```html
<!-- Mobile: Icon button → Opens modal -->
<button onclick="openSearchModal()">
  <svg><!-- Search icon --></svg>
</button>

<!-- Tablet+: Inline input -->
<input type="text" class="hidden sm:block" />
```

**Rationale:**
- **Full-screen search modal** provides better typing experience on mobile
- Larger keyboard area without layout constraints
- Can include filters, suggestions, recent searches
- **Inline search** on desktop for quick access

#### View Switcher
```html
<!-- Icon-only button group -->
<div class="inline-flex rounded-lg border">
  <button aria-label="Grid view">
    <svg><!-- Grid icon --></svg>
  </button>
  <button aria-label="Tree view">
    <svg><!-- Tree icon --></svg>
  </button>
</div>
```

**Rationale:**
- Icons are **self-explanatory** (grid vs tree)
- **48x48px touch targets** meet Material standards
- **No text needed** on mobile
- Border creates **clear button group** affordance

---

### 2. Carbon Design System (IBM)

#### Breadcrumbs
```html
<!-- Mobile: Compact breadcrumb (1 level) -->
<nav class="text-sm">
  <button>←</button>
  <span>Workspaces</span>
</nav>

<!-- Desktop: Full breadcrumb trail -->
<nav>
  <a href="#">Workspaces</a> / 
  <a href="#">UPS US</a>
</nav>
```

**Rationale:**
- Shows **parent level** on mobile for context
- **Full trail** on desktop for navigation
- Text-based breadcrumb on separate line

#### Compact Layout
```html
<!-- Single line: Breadcrumb + Title + Actions -->
<div class="flex items-center justify-between">
  <div>
    <nav><!-- Breadcrumb --></nav>
    <h1>UPS US</h1>
  </div>
  <div><!-- Actions --></div>
</div>
```

**Rationale:**
- **Vertical efficiency** for data-heavy interfaces
- Good for **enterprise applications**
- Familiar to IBM product users

---

### 3. Shopify Polaris

#### Breadcrumbs
```html
<!-- Mobile: Back link with text -->
<a href="#" class="flex items-center gap-2">
  <svg><!-- Arrow --></svg>
  <span>Workspaces</span>
</a>
```

**Rationale:**
- **Text + icon** provides more context than icon alone
- Good for **e-commerce** where users may not know where "back" goes
- **Clearer navigation** for less technical users

#### Search
```html
<!-- Mobile: Full-width search always visible -->
<input type="text" class="w-full" placeholder="Search..." />
```

**Rationale:**
- Search is **primary action** in e-commerce
- Always visible = **lower friction**
- Good for **product catalogs**

#### View Switcher
```html
<!-- Mobile: Dropdown select -->
<select>
  <option>Tree view</option>
  <option>Grid view</option>
</select>
```

**Rationale:**
- **Native select** works well on mobile
- Can include **more than 2 options**
- Familiar UI pattern

---

## 📐 Responsive Breakpoint Strategy

### Mobile First Approach

```css
/* Base = Mobile (< 640px) */
.breadcrumb { display: none; }
.back-button { display: flex; }
.search-input { display: none; }
.search-icon { display: block; }
.view-label { display: none; }
.expand-collapse { display: none; }

/* Tablet (640px+) */
@media (min-width: 640px) {
  .breadcrumb { display: flex; }
  .back-button { display: none; }
  .search-input { display: block; width: 192px; }
  .search-icon { display: none; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .search-input { width: 256px; }
  .view-label { display: inline; }
  .expand-collapse { display: flex; }
}
```

---

## 🎯 Implementation Code

### Material Design 3 Pattern (Recommended)

```html
<!-- MOBILE-FIRST HEADER -->
<div class="mb-6">
  
  <!-- Mobile: Back + Title + Search Icon -->
  <div class="flex items-center justify-between gap-3 mb-4 lg:hidden">
    <!-- Back Button -->
    <button onclick="history.back()" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    
    <!-- Title -->
    <h1 class="text-xl font-bold text-gray-900 flex-1 truncate">UPS US</h1>
    
    <!-- Search Icon -->
    <button onclick="openSearchModal()" class="p-2 hover:bg-gray-100 rounded-lg">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  </div>
  
  <!-- Tablet/Desktop: Breadcrumb + Search + View Switcher -->
  <div class="hidden lg:flex items-center justify-between gap-4 mb-4">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm">
      <a href="#" class="text-gray-600 hover:text-gray-900 hover:underline">Workspaces</a>
      <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m9 18 6-6-6-6"/>
      </svg>
      <span class="text-gray-900 font-medium">UPS US</span>
    </nav>
    
    <!-- Search + View Switcher -->
    <div class="flex items-center gap-3">
      <!-- Search Input -->
      <div class="relative">
        <input 
          type="text" 
          placeholder="Search folders..." 
          class="w-48 lg:w-64 pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>
      
      <!-- View Switcher -->
      <div class="inline-flex rounded-lg border border-gray-200 bg-gray-50">
        <button 
          onclick="setView('grid')" 
          class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-l-lg transition-colors text-sm"
          aria-label="Grid view"
        >
          <svg class="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span class="hidden lg:inline text-gray-700 font-medium">Grid</span>
        </button>
        <button 
          onclick="setView('tree')" 
          class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-r-lg text-sm font-medium"
          aria-label="Tree view"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 3h6M9 21h6M3 9h18M3 15h18"/>
          </svg>
          <span class="hidden lg:inline">Tree</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile: View Switcher (icon-only) -->
  <div class="flex items-center justify-between lg:hidden">
    <div class="inline-flex rounded-lg border border-gray-200 bg-gray-50">
      <button onclick="setView('grid')" class="p-2.5 hover:bg-gray-100 rounded-l-lg" aria-label="Grid view">
        <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
      <button onclick="setView('tree')" class="p-2.5 bg-blue-600 text-white rounded-r-lg" aria-label="Tree view">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 3h6M9 21h6M3 9h18M3 15h18"/>
        </svg>
      </button>
    </div>
    
    <!-- Overflow Menu -->
    <button onclick="toggleOverflowMenu()" class="p-2 hover:bg-gray-100 rounded-lg">
      <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="5" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="19" r="1" fill="currentColor"></circle>
      </svg>
    </button>
  </div>
  
  <!-- Desktop: Title + Expand/Collapse -->
  <div class="hidden lg:flex items-center justify-between mt-4">
    <h1 class="text-3xl font-bold text-gray-900">UPS US</h1>
    
    <div class="flex items-center gap-2">
      <button class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
        </svg>
        Expand All
      </button>
      <button class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
        </svg>
        Collapse All
      </button>
    </div>
  </div>
  
</div>

<!-- Search Modal (for mobile) -->
<div id="search-modal" class="hidden fixed inset-0 bg-white z-50 lg:hidden">
  <div class="p-4">
    <!-- Modal Header -->
    <div class="flex items-center gap-3 mb-4">
      <button onclick="closeSearchModal()" class="p-2 -ml-2">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <input 
        type="text" 
        placeholder="Search folders..." 
        class="flex-1 px-4 py-3 text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        autofocus
      >
    </div>
    
    <!-- Search Results -->
    <div class="mt-6">
      <p class="text-sm text-gray-500 mb-4">Recent searches</p>
      <!-- Results here -->
    </div>
  </div>
</div>

<script>
function openSearchModal() {
  document.getElementById('search-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSearchModal() {
  document.getElementById('search-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function setView(view) {
  console.log('Setting view:', view);
  // Implement view switching logic
}

function toggleOverflowMenu() {
  // Show menu with Expand All, Collapse All options
}
</script>
```

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

#### Breadcrumbs
```html
<nav aria-label="Breadcrumb">
  <ol class="flex items-center gap-2">
    <li><a href="#">Workspaces</a></li>
    <li aria-hidden="true">/</li>
    <li aria-current="page">UPS US</li>
  </ol>
</nav>
```

#### View Switcher
```html
<div role="group" aria-label="View options">
  <button aria-label="Grid view" aria-pressed="false">
    <svg><!-- Icon --></svg>
  </button>
  <button aria-label="Tree view" aria-pressed="true">
    <svg><!-- Icon --></svg>
  </button>
</div>
```

#### Search Modal
```html
<div role="dialog" aria-modal="true" aria-labelledby="search-title">
  <h2 id="search-title" class="sr-only">Search</h2>
  <input aria-label="Search folders" />
</div>
```

---

## 🧪 Testing Checklist

### Mobile (< 640px)
- [ ] Back button visible and functional
- [ ] Breadcrumbs hidden
- [ ] Search opens full-screen modal
- [ ] View switcher is icon-only
- [ ] Touch targets 48x48px minimum
- [ ] Expand/Collapse in overflow menu
- [ ] No horizontal scroll

### Tablet (640px - 1023px)
- [ ] Back button hidden
- [ ] Breadcrumb trail visible
- [ ] Inline search bar (narrow)
- [ ] View switcher shows labels
- [ ] Comfortable spacing

### Desktop (1024px+)
- [ ] Full breadcrumb trail
- [ ] Wide search bar (256px)
- [ ] View switcher with icons + labels
- [ ] Expand/Collapse visible
- [ ] All features accessible

---

## 📊 Pattern Decision Matrix

| Use Case | Best Pattern | Reason |
|----------|-------------|---------|
| **General SaaS apps** | Material 3 | Clean, space-efficient, universally understood |
| **Enterprise/Data-heavy** | Carbon | Compact, efficient, familiar to power users |
| **E-commerce** | Polaris | Search-first, clear navigation, less technical |
| **Content management** | Material 3 | Good for hierarchical navigation |
| **Admin dashboards** | Carbon | Dense information, efficiency-focused |

---

## 💡 Recommendation Summary

### For Your Workspace Navigation: **Material Design 3**

**Why:**
1. ✅ **Clean mobile experience** - Back button is intuitive
2. ✅ **Space-efficient** - No breadcrumb clutter on mobile
3. ✅ **Progressive enhancement** - Features appear at appropriate breakpoints
4. ✅ **Icon-only view switcher** - Self-explanatory, touch-friendly
5. ✅ **Search modal** - Better typing experience on mobile
6. ✅ **Industry standard** - Used by Google, YouTube, Gmail, etc.

**Implementation:**
- Mobile: Back + Title + Search Icon + Icon View Switcher
- Tablet: Breadcrumb + Inline Search + Labeled View Switcher
- Desktop: Full breadcrumb + Wide Search + All actions

---

## 📚 References

- [Material Design 3 - Navigation](https://m3.material.io/components/navigation-bar)
- [Material Design 3 - Search](https://m3.material.io/components/search)
- [Carbon Design System - Breadcrumb](https://carbondesignsystem.com/components/breadcrumb/)
- [Carbon Design System - Search](https://carbondesignsystem.com/components/search/)
- [Shopify Polaris - Page](https://polaris.shopify.com/components/page)
- [Tailwind CSS - Responsive Design](https://tailwindcss.com/docs/responsive-design)

---

## ✨ Next Steps

1. **View Demo**: Open `MOBILE_BREADCRUMB_SEARCH_PATTERN.html`
2. **Choose Pattern**: Material 3 recommended
3. **Implement**: Copy code from this doc
4. **Test**: Check all breakpoints
5. **Refine**: Adjust based on user feedback

**Ready to implement!** 🚀

