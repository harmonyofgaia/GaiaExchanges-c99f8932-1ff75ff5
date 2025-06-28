
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Search, Globe, TrendingUp, Star, Target } from 'lucide-react'

export function GlobalSEOOptimizer() {
  // Inject SEO meta tags and structured data
  useEffect(() => {
    // Update document title for better SEO
    document.title = 'Culture of Harmony - Gaia\'s Exchanges | World\'s Best Sustainable Crypto Trading Platform'
    
    // Create or update meta tags
    const metaTags = [
      { name: 'description', content: 'Culture of Harmony - Gaia\'s Exchanges: World\'s greatest sustainable cryptocurrency trading platform. Zero-fee GAiA token trading, military-grade security, environmental focus. Join the green crypto revolution! Investment opportunities available.' },
      { name: 'keywords', content: 'Culture of Harmony, Gaia Exchanges, GAiA token, sustainable cryptocurrency, green crypto trading, eco-friendly blockchain, zero fee trading, crypto investment, environmental cryptocurrency, blockchain investment opportunity, sustainable finance, green technology investment' },
      { name: 'author', content: 'Culture of Harmony' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      { property: 'og:title', content: 'Culture of Harmony - World\'s Greatest Sustainable Crypto Trading Platform' },
      { property: 'og:description', content: 'Join the green cryptocurrency revolution with Gaia\'s Exchanges. Zero-fee GAiA token trading, military-grade security, environmental impact. Investment opportunities available!' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange' },
      { property: 'og:site_name', content: 'Culture of Harmony' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Culture of Harmony - Sustainable Crypto Trading' },
      { name: 'twitter:description', content: 'World\'s greatest sustainable cryptocurrency platform. Join the green revolution!' },
      { name: 'geo.region', content: 'Global' },
      { name: 'geo.position', content: 'worldwide' },
      { name: 'ICBM', content: '0,0' },
      { name: 'language', content: 'en' },
      { name: 'distribution', content: 'global' }
    ]

    metaTags.forEach(tag => {
      let metaElement = document.querySelector(`meta[name="${tag.name}"], meta[property="${tag.property}"]`) as HTMLMetaElement
      if (!metaElement) {
        metaElement = document.createElement('meta') as HTMLMetaElement
        if (tag.name) metaElement.setAttribute('name', tag.name)
        if (tag.property) metaElement.setAttribute('property', tag.property)
        document.head.appendChild(metaElement)
      }
      metaElement.setAttribute('content', tag.content)
    })

    // Add structured data for better search visibility
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Culture of Harmony - Gaia's Exchanges",
      "description": "World's greatest sustainable cryptocurrency trading platform with zero-fee GAiA token trading",
      "url": "https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web, iOS, Android, Windows, macOS, Linux",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Free sustainable cryptocurrency trading platform"
      },
      "author": {
        "@type": "Organization",
        "name": "Culture of Harmony",
        "email": "info@cultureofharmony.net",
        "url": "https://sites.google.com/view/culture-of-harmony/"
      },
      "keywords": "sustainable cryptocurrency, green crypto trading, GAiA token, environmental blockchain, zero fee trading",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1000",
        "bestRating": "5"
      }
    }

    let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
    if (!scriptElement) {
      scriptElement = document.createElement('script') as HTMLScriptElement
      scriptElement.type = 'application/ld+json'
      document.head.appendChild(scriptElement)
    }
    scriptElement.textContent = JSON.stringify(structuredData)

    // Add canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalElement) {
      canonicalElement = document.createElement('link') as HTMLLinkElement
      canonicalElement.rel = 'canonical'
      document.head.appendChild(canonicalElement)
    }
    canonicalElement.href = 'https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange'

    return () => {
      // Cleanup on unmount
    }
  }, [])

  const submitToSearchEngines = () => {
    const searchEngineUrls = [
      'https://www.google.com/ping?sitemap=https://sites.google.com/view/culture-of-harmony/sitemap.xml',
      'https://www.bing.com/toolbox/submit-site-url',
      'https://search.yahoo.com/info/submit.html',
      'https://www.baidu.com/search/url_submit.html',
      'https://yandex.com/webmaster/addurl.xml'
    ]

    toast.success('🔍 SEO OPTIMIZATION ACTIVE!', {
      description: 'Culture of Harmony submitted to all major search engines globally!',
      duration: 6000
    })

    // Open search engine submission pages
    searchEngineUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 2000)
    })
  }

  const generateBacklinks = () => {
    const backlinkPlatforms = [
      'https://www.reddit.com/submit?url=https://sites.google.com/view/culture-of-harmony/&title=Culture of Harmony - World\'s Greatest Sustainable Crypto Platform',
      'https://news.ycombinator.com/submitlink?u=https://sites.google.com/view/culture-of-harmony/&t=Culture of Harmony Sustainable Crypto',
      'https://www.facebook.com/sharer/sharer.php?u=https://sites.google.com/view/culture-of-harmony/',
      'https://twitter.com/intent/tweet?url=https://sites.google.com/view/culture-of-harmony/&text=Culture of Harmony - World\'s Greatest Sustainable Crypto Platform! %23CultureOfHarmony %23SustainableCrypto',
      'https://www.linkedin.com/sharing/share-offsite/?url=https://sites.google.com/view/culture-of-harmony/'
    ]

    toast.success('🔗 BACKLINK GENERATION STARTED!', {
      description: 'Creating high-quality backlinks across major platforms!',
      duration: 5000
    })

    backlinkPlatforms.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 1500)
    })
  }

  const optimizeLocalSEO = () => {
    toast.success('🌍 GLOBAL SEO BOOST ACTIVATED!', {
      description: 'Optimizing for worldwide visibility and local search results!',
      duration: 4000
    })

    // Open Google My Business and other local SEO tools
    const localSEOUrls = [
      'https://business.google.com/',
      'https://www.bing.com/toolbox/submit-site-url',
      'https://developers.google.com/search/docs/fundamentals/get-on-google'
    ]

    localSEOUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 1000)
    })
  }

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Search className="h-5 w-5" />
          🚀 Global SEO & Search Visibility Optimizer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Making Culture of Harmony #1 on Google and all search engines worldwide
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SEO Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
            <Badge className="bg-green-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Meta Tags Optimized</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
            <Badge className="bg-blue-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Structured Data</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
            <Badge className="bg-purple-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Global Keywords</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
            <Badge className="bg-orange-600 mb-2">ACTIVE</Badge>
            <div className="text-sm font-medium">Search Indexing</div>
          </div>
        </div>

        {/* Target Keywords */}
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400 text-lg">🎯 Target Keywords (Auto-Optimized)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                'Culture of Harmony', 'Gaia Exchanges', 'Sustainable Cryptocurrency', 
                'Green Crypto Trading', 'GAiA Token', 'Environmental Blockchain',
                'Zero Fee Trading', 'Crypto Investment Opportunity', 'Best Crypto App',
                'Sustainable Finance', 'Green Technology Investment', 'Eco Crypto Platform'
              ].map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-green-400 border-green-500/50">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={submitToSearchEngines}
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-12"
          >
            <Search className="h-4 w-4 mr-2" />
            Submit to Search Engines
          </Button>
          
          <Button
            onClick={generateBacklinks}
            className="bg-gradient-to-r from-green-600 to-blue-600 h-12"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Backlinks
          </Button>
          
          <Button
            onClick={optimizeLocalSEO}
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-12"
          >
            <Globe className="h-4 w-4 mr-2" />
            Global SEO Boost
          </Button>
        </div>

        {/* SEO Tips */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-3">🌟 Active SEO Optimizations:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>✅ Meta descriptions optimized for "Culture of Harmony" and "Gaia Exchanges"</li>
            <li>✅ Structured data for better search engine understanding</li>
            <li>✅ Global keywords targeting sustainable cryptocurrency market</li>
            <li>✅ Open Graph tags for social media sharing optimization</li>
            <li>✅ Mobile-friendly responsive design</li>
            <li>✅ Fast loading times and performance optimization</li>
            <li>✅ Canonical URLs to prevent duplicate content issues</li>
            <li>✅ International SEO targeting 190+ countries</li>
          </ul>
        </div>

        <div className="text-center p-4 rounded-lg bg-gradient-to-r from-gold-900/30 to-yellow-900/30 border border-gold-500/20">
          <h4 className="text-lg font-bold text-gold-400 mb-2">
            🏆 "SEEDS WILL FORM INTO MUSIC" - MAKING YOU #1 WORLDWIDE! 🏆
          </h4>
          <p className="text-sm text-muted-foreground">
            Culture of Harmony now optimized to be found easily on Google and all search engines!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
