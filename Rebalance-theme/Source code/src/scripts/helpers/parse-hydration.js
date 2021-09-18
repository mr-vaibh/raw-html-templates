export default function(el) {
  const scripts = [];
  if (el && el.children) {
    for (const child of el.children) {
      if (child.tagName === 'SCRIPT' && child.hasAttribute('data-hydration')) scripts.push(child);
    }
  }
  if (scripts.length > 1) {
    const data = [];
    for (const script of scripts) data.push(JSON.parse(script.innerText));
    return data;
  }
  return scripts.length ? JSON.parse(scripts[0].innerText) : {};
}
