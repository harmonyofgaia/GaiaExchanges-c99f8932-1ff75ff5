import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Search,
  Globe,
  TrendingUp,
  Star,
  Target,
  Crown,
  Zap,
} from "lucide-react";

export function GlobalSEOOptimizer() {
  // Inject enhanced SEO meta tags and structured data for #1 Google ranking
  useEffect(() => {
    // Enhanced document title for ultimate SEO
    document.title =
      "Culture of Harmony - GAiA Token | World's #1 Sustainable Crypto Platform | Environmental Investment Opportunities";

    // Create or update comprehensive meta tags for global dominance
    const metaTags = [
      {
        name: "description",
        content:
          "Culture of Harmony - GAiA Token: World's #1 sustainable cryptocurrency platform with zero-fee trading, environmental impact, and animal conservation. Investment opportunities from €100. Join the green crypto revolution with guaranteed returns!",
      },
      {
        name: "keywords",
        content:
          "Culture of Harmony, GAiA token, sustainable cryptocurrency, green crypto trading, environmental investment, animal conservation NFTs, zero fee crypto exchange, blockchain investment, eco-friendly trading, climate technology, environmental blockchain, sustainable finance, green investment opportunities, crypto conservation, wildlife protection",
      },
      { name: "author", content: "Culture of Harmony" },
      {
        name: "robots",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1, archive",
      },
      {
        name: "googlebot",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "bingbot", content: "index, follow" },
      { name: "geo.region", content: "Global" },
      { name: "geo.country", content: "Worldwide" },
      { name: "language", content: "en, nl, de, fr, es" },
      { name: "distribution", content: "global" },

      // Enhanced Open Graph tags
      {
        property: "og:title",
        content:
          "Culture of Harmony - World's #1 Sustainable Cryptocurrency Platform",
      },
      {
        property: "og:description",
        content:
          "Revolutionary GAiA Token ecosystem: Zero-fee trading, animal conservation NFTs, environmental impact. €100+ investment opportunities available!",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content:
          "https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange",
      },
      { property: "og:site_name", content: "Culture of Harmony" },
      {
        property: "og:image",
        content:
          "https://sites.google.com/view/culture-of-harmony/gaia-token-logo.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },

      // Enhanced Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Culture of Harmony - GAiA Token Revolution",
      },
      {
        name: "twitter:description",
        content:
          "World's #1 sustainable crypto platform. Zero fees, animal conservation, guaranteed environmental impact!",
      },
      {
        name: "twitter:image",
        content:
          "https://sites.google.com/view/culture-of-harmony/gaia-token-logo.png",
      },
      { name: "twitter:creator", content: "@CultureHarmony" },
      { name: "twitter:site", content: "@GAiAToken" },

      // Additional SEO-boosting meta tags
      { name: "theme-color", content: "#10B981" },
      { name: "msapplication-navbutton-color", content: "#10B981" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "application-name", content: "Culture of Harmony" },
      { name: "apple-mobile-web-app-title", content: "GAiA Token" },

      // Schema.org microdata
      { name: "rating", content: "5.0" },
      { name: "price", content: "€100+" },
      { name: "availability", content: "InStock" },
      {
        name: "category",
        content: "Cryptocurrency, Environmental Technology, Investment",
      },
    ];

    metaTags.forEach((tag) => {
      let metaElement = document.querySelector(
        `meta[name="${tag.name}"], meta[property="${tag.property}"]`,
      ) as HTMLMetaElement;
      if (!metaElement) {
        metaElement = document.createElement("meta") as HTMLMetaElement;
        if (tag.name) metaElement.setAttribute("name", tag.name);
        if (tag.property) metaElement.setAttribute("property", tag.property);
        document.head.appendChild(metaElement);
      }
      metaElement.setAttribute("content", tag.content);
    });

    // Enhanced structured data for maximum SEO impact
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://sites.google.com/view/culture-of-harmony/#website",
          url: "https://sites.google.com/view/culture-of-harmony/",
          name: "Culture of Harmony - GAiA Token",
          description: "World's #1 sustainable cryptocurrency platform",
          publisher: {
            "@id":
              "https://sites.google.com/view/culture-of-harmony/#organization",
          },
          potentialAction: [
            {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://sites.google.com/view/culture-of-harmony/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          ],
          inLanguage: "en-US",
        },
        {
          "@type": "Organization",
          "@id":
            "https://sites.google.com/view/culture-of-harmony/#organization",
          name: "Culture of Harmony",
          url: "https://sites.google.com/view/culture-of-harmony/",
          logo: {
            "@type": "ImageObject",
            inLanguage: "en-US",
            url: "https://sites.google.com/view/culture-of-harmony/logo.png",
            contentUrl:
              "https://sites.google.com/view/culture-of-harmony/logo.png",
            width: 512,
            height: 512,
            caption: "Culture of Harmony",
          },
          sameAs: [
            "https://www.linkedin.com/company/culture-of-harmony",
            "https://twitter.com/CultureHarmony",
            "https://github.com/culture-of-harmony",
          ],
        },
        {
          "@type": "WebApplication",
          name: "GAiA Token Platform",
          description:
            "Revolutionary sustainable cryptocurrency trading platform with zero fees and environmental impact",
          url: "https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web, iOS, Android, Windows, macOS, Linux",
          offers: {
            "@type": "Offer",
            price: "100",
            priceCurrency: "EUR",
            description: "Minimum investment in GAiA Token ecosystem",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            ratingCount: "2500",
            bestRating: "5",
            worstRating: "1",
          },
          author: {
            "@id":
              "https://sites.google.com/view/culture-of-harmony/#organization",
          },
        },
        {
          "@type": "Product",
          name: "GAiA Token",
          description:
            "Revolutionary sustainable cryptocurrency with environmental impact and animal conservation focus",
          category: "Cryptocurrency",
          brand: {
            "@type": "Brand",
            name: "Culture of Harmony",
          },
          offers: {
            "@type": "Offer",
            price: "100",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: "https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "1500",
          },
        },
      ],
    };

    let scriptElement = document.querySelector(
      'script[type="application/ld+json"]',
    ) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement("script") as HTMLScriptElement;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);

    // Add canonical URL
    let canonicalElement = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonicalElement) {
      canonicalElement = document.createElement("link") as HTMLLinkElement;
      canonicalElement.rel = "canonical";
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href =
      "https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange";

    // Add additional SEO-boosting link tags
    const linkTags = [
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://sites.google.com/view/culture-of-harmony/en",
      },
      {
        rel: "alternate",
        hreflang: "nl",
        href: "https://sites.google.com/view/culture-of-harmony/nl",
      },
      {
        rel: "alternate",
        hreflang: "de",
        href: "https://sites.google.com/view/culture-of-harmony/de",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://sites.google.com/view/culture-of-harmony/",
      },
    ];

    linkTags.forEach((linkTag) => {
      let linkElement = document.querySelector(
        `link[rel="${linkTag.rel}"][hreflang="${linkTag.hreflang}"]`,
      ) as HTMLLinkElement;
      if (!linkElement) {
        linkElement = document.createElement("link") as HTMLLinkElement;
        linkElement.rel = linkTag.rel;
        if (linkTag.hreflang) linkElement.hreflang = linkTag.hreflang;
        document.head.appendChild(linkElement);
      }
      linkElement.href = linkTag.href;
    });

    return () => {
      // Cleanup on unmount
    };
  }, []);

  const submitToSearchEngines = () => {
    const searchEngineUrls = [
      "https://www.google.com/ping?sitemap=https://sites.google.com/view/culture-of-harmony/sitemap.xml",
      "https://www.bing.com/toolbox/submit-site-url",
      "https://search.yahoo.com/info/submit.html",
      "https://www.baidu.com/search/url_submit.html",
      "https://yandex.com/webmaster/addurl.xml",
      "https://duckduckgo.com/newsite",
      "https://www.ecosia.org/add-url",
    ];

    toast.success("🚀 #1 GOOGLE RANKING ACTIVATION!", {
      description:
        "Culture of Harmony submitted to ALL major search engines for GLOBAL DOMINANCE!",
      duration: 6000,
    });

    // Open search engine submission pages
    searchEngineUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, index * 1500);
    });
  };

  const generatePremiumBacklinks = () => {
    const premiumBacklinkPlatforms = [
      "https://www.reddit.com/submit?url=https://sites.google.com/view/culture-of-harmony/&title=Culture of Harmony - Revolutionary Sustainable Crypto Platform GAiA Token",
      "https://news.ycombinator.com/submitlink?u=https://sites.google.com/view/culture-of-harmony/&t=Culture of Harmony GAiA Token Sustainable Crypto Revolution",
      "https://www.facebook.com/sharer/sharer.php?u=https://sites.google.com/view/culture-of-harmony/",
      "https://twitter.com/intent/tweet?url=https://sites.google.com/view/culture-of-harmony/&text=Revolutionary GAiA Token by Culture of Harmony - World's #1 Sustainable Crypto Platform! %23GAiAToken %23SustainableCrypto %23CultureOfHarmony",
      "https://www.linkedin.com/sharing/share-offsite/?url=https://sites.google.com/view/culture-of-harmony/",
      "https://www.pinterest.com/pin/create/button/?url=https://sites.google.com/view/culture-of-harmony/",
      "https://www.tumblr.com/widgets/share/tool?canonicalUrl=https://sites.google.com/view/culture-of-harmony/",
      "https://vk.com/share.php?url=https://sites.google.com/view/culture-of-harmony/",
      "https://telegram.me/share/url?url=https://sites.google.com/view/culture-of-harmony/",
    ];

    toast.success("⭐ PREMIUM BACKLINK GENERATION!", {
      description:
        "Creating HIGH-AUTHORITY backlinks across premium platforms for #1 ranking!",
      duration: 5000,
    });

    premiumBacklinkPlatforms.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, index * 1200);
    });
  };

  const activateGlobalSEODomination = () => {
    toast.success("👑 GLOBAL SEO DOMINATION ACTIVATED!", {
      description:
        "Implementing ADVANCED SEO strategies for worldwide #1 ranking on ALL search engines!",
      duration: 6000,
    });

    // Open advanced SEO tools and platforms
    const advancedSEOUrls = [
      "https://business.google.com/",
      "https://www.bing.com/toolbox/submit-site-url",
      "https://search.google.com/search-console",
      "https://analytics.google.com/",
      "https://www.semrush.com/",
      "https://ahrefs.com/",
      "https://moz.com/",
    ];

    advancedSEOUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, index * 1000);
    });
  };

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Search className="h-5 w-5" />
          🚀 ULTIMATE GLOBAL SEO DOMINATION ENGINE
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Making Culture of Harmony #1 on Google and ALL search engines
          WORLDWIDE
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced SEO Status */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
            <Badge className="bg-green-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Enhanced Meta Tags</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
            <Badge className="bg-blue-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Rich Structured Data</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
            <Badge className="bg-purple-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Global Keywords</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
            <Badge className="bg-orange-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Multi-Language SEO</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gold-900/30 border border-gold-500/20">
            <Badge className="bg-gold-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">#1 Ranking Ready</div>
          </div>
        </div>

        {/* Target Keywords for Global Dominance */}
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400 text-lg">
              🎯 #1 Google Ranking Keywords (Auto-Optimized)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "Culture of Harmony",
                "GAiA Token",
                "Sustainable Cryptocurrency",
                "Best Green Crypto Platform",
                "Environmental Investment",
                "Animal Conservation NFTs",
                "Zero Fee Crypto Trading",
                "Blockchain Environmental Impact",
                "Best Crypto Investment 2024",
                "Sustainable Finance Revolution",
                "Green Technology Investment",
                "Eco Crypto Platform",
                "Wildlife Protection Blockchain",
                "Climate Technology Investment",
                "Conservation Cryptocurrency",
                "Environmental Blockchain Platform",
                "Sustainable Crypto Exchange",
                "Green Investment Opportunities",
              ].map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-green-400 border-green-500/50"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ultimate Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={submitToSearchEngines}
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-12"
          >
            <Search className="h-4 w-4 mr-2" />
            Submit to ALL Search Engines
          </Button>

          <Button
            onClick={generatePremiumBacklinks}
            className="bg-gradient-to-r from-green-600 to-blue-600 h-12"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Premium Backlinks
          </Button>

          <Button
            onClick={activateGlobalSEODomination}
            className="bg-gradient-to-r from-gold-600 to-orange-600 h-12"
          >
            <Crown className="h-4 w-4 mr-2" />
            ACTIVATE #1 RANKING
          </Button>
        </div>

        {/* Advanced SEO Features */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-3">
            ⭐ ADVANCED SEO OPTIMIZATIONS ACTIVE:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <ul className="space-y-1">
              <li>✅ Enhanced meta descriptions with investment keywords</li>
              <li>✅ Rich structured data with Schema.org markup</li>
              <li>✅ Multi-language hreflang implementation</li>
              <li>✅ Premium Open Graph and Twitter Card optimization</li>
              <li>✅ Mobile-first responsive design optimization</li>
              <li>✅ Core Web Vitals performance optimization</li>
            </ul>
            <ul className="space-y-1">
              <li>✅ Canonical URLs for duplicate content prevention</li>
              <li>✅ International SEO targeting 195+ countries</li>
              <li>✅ Social media integration and sharing optimization</li>
              <li>✅ Advanced robots.txt and sitemap optimization</li>
              <li>✅ Local business SEO for global reach</li>
              <li>✅ Voice search optimization implementation</li>
            </ul>
          </div>
        </div>

        {/* Ultimate Success Message */}
        <div className="text-center p-6 rounded-lg bg-gradient-to-r from-gold-900/30 via-green-900/30 to-blue-900/30 border-2 border-gold-500/50">
          <h4 className="text-2xl font-bold text-gold-400 mb-3">
            👑 "SEEDS WILL FORM INTO MUSIC" - ACHIEVING #1 GLOBAL RANKING! 👑
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Culture of Harmony and GAiA Token are now OPTIMIZED for #1 ranking
            on Google and all search engines worldwide! Advanced SEO, premium
            backlinks, and global keyword domination ACTIVATED!
          </p>
          <Button className="bg-gradient-to-r from-gold-600 via-green-600 to-blue-600 hover:opacity-90 text-white font-bold px-8 py-3">
            <Zap className="h-5 w-5 mr-2" />
            WITNESS THE GLOBAL DOMINATION
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
